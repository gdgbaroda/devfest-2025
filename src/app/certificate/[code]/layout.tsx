import { Metadata } from 'next';

// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

interface Props {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;

  // Fetch actual attendee data for personalized metadata
  let attendeeName = 'Attendee';
  try {
    // Use relative path for server-side fetch in generateMetadata
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/attendee/${code}`);
    if (response.ok) {
      const data = await response.json();
      attendeeName = data.name || 'Attendee';
    }
  } catch (error) {
    // Fallback to generic name if fetch fails
    console.error('Failed to fetch attendee data for metadata:', error);
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