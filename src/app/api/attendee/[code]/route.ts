import { NextRequest, NextResponse } from 'next/server';

// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

interface AttendeeData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  ticketType: string;
  ticketNo: string;
  qrCode: string;
}

// Embedded attendee data for Edge Runtime compatibility
const ATTENDEES_DATA: AttendeeData[] = [
  {
    name: 'Aditipriya Dubey',
    email: 'aditipriyamdubey@gmail.com',
    firstName: 'Aditipriya',
    lastName: 'Dubey',
    ticketType: 'Workshop Day - Oct 4 2025 - General Entry',
    ticketNo: '362',
    qrCode: 'HL611059HC'
  },
  {
    name: 'Jiya Singh',
    email: 'jiy5239@gmail.com',
    firstName: 'Jiya',
    lastName: 'Singh',
    ticketType: 'Workshop Day - Oct 4 2025 - General Entry',
    ticketNo: '363',
    qrCode: 'FC405182HR'
  },
  {
    name: 'Shagun Chaudhari',
    email: 'shagun22r@gmail.com',
    firstName: 'Shagun',
    lastName: 'Chaudhari',
    ticketType: 'Workshop Day - Oct 4 2025 - General Entry',
    ticketNo: '364',
    qrCode: 'DS580716LK'
  },
  {
    name: 'Rohini Pandya',
    email: 'rohinip711@gmail.com',
    firstName: 'Rohini',
    lastName: 'Pandya',
    ticketType: 'Workshop Day - Oct 4 2025 - General Entry',
    ticketNo: '365',
    qrCode: 'AO545195XE'
  }
];

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