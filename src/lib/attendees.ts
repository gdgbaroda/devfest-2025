import rawTicketsJson from '../../data/tickets.json';

export interface AttendeeData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  ticketType: string;
  ticketNo: string;
  qrCode: string;
  checkedIn: string;
}

type RawTicketRecord = Partial<{
  name: unknown;
  email: unknown;
  first_name: unknown;
  last_name: unknown;
  ticket_type: unknown;
  ticket_no: unknown;
  barcode_no: unknown;
  checked_in: unknown;
}>;

interface AttendeeStore {
  list: AttendeeData[];
  byCode: Map<string, AttendeeData>;
}

function toTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normaliseCode(value: string): string {
  return value.trim().toUpperCase();
}

function createAttendeeStore(records: RawTicketRecord[]): AttendeeStore {
  const attendees = records.reduce<AttendeeData[]>((acc, raw) => {
    const record = raw as RawTicketRecord;
    const code = normaliseCode(toTrimmedString(record.barcode_no ?? record.ticket_no));
    if (!code) {
      return acc;
    }

    const firstName = toTrimmedString(record.first_name);
    const lastName = toTrimmedString(record.last_name);
    const fullName = toTrimmedString(record.name) || `${firstName} ${lastName}`.trim();

    acc.push({
      name: fullName || code,
      email: toTrimmedString(record.email),
      firstName,
      lastName,
      ticketType: toTrimmedString(record.ticket_type),
      ticketNo: toTrimmedString(record.ticket_no) || code,
      qrCode: code,
      checkedIn: toTrimmedString(record.checked_in),
    });

    return acc;
  }, []);

  const byCode = new Map(attendees.map((attendee) => [attendee.qrCode, attendee]));

  return { list: attendees, byCode };
}

const rawTickets = Array.isArray(rawTicketsJson) ? (rawTicketsJson as RawTicketRecord[]) : [];
const attendeesStore = createAttendeeStore(rawTickets);

export const ATTENDEES_DATA: AttendeeData[] = attendeesStore.list;

export function getAttendeeByCode(code: string): AttendeeData | undefined {
  if (!code) {
    return undefined;
  }

  const normalised = normaliseCode(code);
  return attendeesStore.byCode.get(normalised);
}
