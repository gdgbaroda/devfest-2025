import { Metadata } from 'next';

interface Props {
  params: {
    code: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;

  // Try to fetch attendee data for better metadata
  const attendeeName = 'Attendee';
  try {
    // In a real app, you'd fetch from your data source
    // For now, we'll use generic metadata
  } catch (error) {
    // Handle error silently
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