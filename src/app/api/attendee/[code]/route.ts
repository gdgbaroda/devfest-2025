import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface AttendeeData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  ticketType: string;
  ticketNo: string;
  qrCode: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;

    // Read CSV from private data directory
    const csvPath = path.join(process.cwd(), 'data', 'attendees.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');

    const lines = csvContent.split('\n');

    // Find the attendee with matching QR code
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (row.length > 10) {
        const qrCode = row[10]?.trim(); // "BAR/QR code No." column

        if (qrCode === code) {
          const attendee: AttendeeData = {
            name: row[1]?.trim() || '',
            email: row[2]?.trim() || '',
            firstName: row[4]?.trim() || '',
            lastName: row[5]?.trim() || '',
            ticketType: row[6]?.trim() || '',
            ticketNo: row[8]?.trim() || '',
            qrCode: qrCode
          };

          return NextResponse.json(attendee);
        }
      }
    }

    // If no attendee found
    return NextResponse.json(
      { error: 'Attendee not found' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Error reading attendee data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}