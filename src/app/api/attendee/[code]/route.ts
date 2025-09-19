import { NextRequest, NextResponse } from 'next/server';
import { ATTENDEES_DATA } from '../../../../data/attendees.js';

// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    // Find the attendee with matching QR code
    const attendee = ATTENDEES_DATA.find(a => a.qrCode === code);

    if (attendee) {
      return NextResponse.json(attendee);
    }

    // If no attendee found
    return NextResponse.json(
      { error: 'Attendee not found' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Error fetching attendee data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}