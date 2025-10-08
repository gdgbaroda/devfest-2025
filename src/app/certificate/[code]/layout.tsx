import { Metadata } from "next";
import { getAttendeeByCode } from "@/lib/attendees";

interface Props {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;

  const attendee = getAttendeeByCode(code);
  const attendeeName = attendee?.name || "Attendee";

  const siteOrigin = "https://devfest2025.gdgbaroda.com";
  const certificateUrl = `${siteOrigin}/certificate/${code}`;
  const certificateTitle = `DevFest 2025 Certificate | ${attendeeName}`;
  const certificateDescription =
    "Verify the participation certificate awarded at DevFest 2025 by GDG Baroda.";
  const shareImage = `${siteOrigin}/GroupPhoto1.jpg`;

  return {
    title: certificateTitle,
    description: certificateDescription,
    alternates: {
      canonical: certificateUrl,
    },
    openGraph: {
      title: certificateTitle,
      description: certificateDescription,
      type: "article",
      url: certificateUrl,
      siteName: "DevFest 2025 | GDG Baroda",
      locale: "en_US",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 627,
          alt: "DevFest 2025 Certificate preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: certificateTitle,
      description: certificateDescription,
      images: [shareImage],
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
