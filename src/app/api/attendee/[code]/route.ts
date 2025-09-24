import { NextRequest, NextResponse } from "next/server";
import { getAttendeeByCode } from "@/lib/attendees";

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
    const attendee = getAttendeeByCode(code);

    if (attendee?.checkedIn) {
      return NextResponse.json(attendee);
    }

    // If no attendee found
    return NextResponse.json(
      {
        error:
          "Certificate not found. You may not have attended the workshop. If you believe this is a mistake, contact work@ayushmakwana.com.",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching attendee data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
