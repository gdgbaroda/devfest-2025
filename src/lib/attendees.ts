import rawTicketsJson from "../../data/tickets.json";

export interface AttendeeData {
  name: string;
  ticketType: string;
  ticketNo: string;
  qrCode: string;
  checkedIn: string;
}

type RawTicketRecord = Partial<{
  name: string;
  ticket_type: string;
  ticket_no: string;
  barcode_no: string;
  checked_in: string;
}>;

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normaliseCode(value: string): string {
  return value.trim().toUpperCase();
}

function createAttendeeStore(records: RawTicketRecord[]) {
  const attendees = records.reduce<AttendeeData[]>((acc, raw) => {
    const record = raw as RawTicketRecord;
    const code = normaliseCode(
      toTrimmedString(record.barcode_no ?? record.ticket_no)
    );
    if (!code) {
      return acc;
    }

    acc.push({
      name: toTrimmedString(record.name),
      ticketType: toTrimmedString(record.ticket_type),
      ticketNo: toTrimmedString(record.ticket_no),
      qrCode: code,
      checkedIn: toTrimmedString(record.checked_in),
    });

    return acc;
  }, []) as AttendeeData[];

  const byCode = new Map(
    attendees.map((attendee) => [attendee.qrCode, attendee])
  );

  return { list: attendees, byCode } as const;
}

const rawTickets = Array.isArray(rawTicketsJson)
  ? (rawTicketsJson as RawTicketRecord[])
  : [];
const attendeesStore = createAttendeeStore(rawTickets);

export const ATTENDEES_DATA: AttendeeData[] = attendeesStore.list;

export function getAttendeeByCode(code: string): AttendeeData | undefined {
  if (!code) {
    return undefined;
  }

  const normalised = normaliseCode(code);
  return attendeesStore.byCode.get(normalised);
}
