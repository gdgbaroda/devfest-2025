import { NextRequest, NextResponse } from "next/server";
import { ATTENDEES_DATA } from "@/lib/attendees";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<unknown> }
) {
  try {
    const resolvedParams = ((await params) ?? {}) as Record<
      string,
      string | string[] | undefined
    >;
    const codeParam = resolvedParams.code;
    const code = Array.isArray(codeParam) ? codeParam[0] : codeParam;

    if (!code) {
      return NextResponse.json(
        { error: "Certificate code is required" },
        { status: 400 }
      );
    }

    // Find the attendee with matching QR code
    const attendee = ATTENDEES_DATA.find((a) => a.qrCode === code);

    if (attendee) {
      return NextResponse.json(attendee);
    }

    // If no attendee found
    return NextResponse.json({ error: "Attendee not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching attendee data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
