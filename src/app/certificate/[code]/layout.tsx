import { Metadata } from 'next';
import { ATTENDEES_DATA } from '@/data/attendees';

// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

interface Props {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;

  // Find attendee data directly from embedded data (no HTTP fetch needed)
  let attendeeName = 'Attendee';
  try {
    const attendee = ATTENDEES_DATA.find(a => a.qrCode === code);
    if (attendee) {
      attendeeName = attendee.name;
    }
  } catch (error) {
    // Fallback to generic name if lookup fails
    console.error('Failed to lookup attendee data for metadata:', error);
  }

  return {
    title: `DevFest 2025 Certificate - ${attendeeName}`,
    description: `Certificate of participation for DevFest 2025 - Gujarat's Premier Developer Conference`,
    openGraph: {
      title: `DevFest 2025 Certificate`,
      description: `Certificate of participation for DevFest 2025 - Gujarat's Premier Developer Conference`,
      type: 'website',
      url: `https://devfest.gdgbaroda.com/certificate/${code}`,
      images: [
        {
          url: '/DF25-Logo-Lockup.svg',
          width: 1200,
          height: 630,
          alt: 'DevFest 2025 Certificate',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `DevFest 2025 Certificate`,
      description: `Certificate of participation for DevFest 2025 - Gujarat's Premier Developer Conference`,
      images: ['/DF25-Logo-Lockup.svg'],
    },
  };
}

export default function CertificateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}