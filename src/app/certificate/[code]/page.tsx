import { CertificateDetailClient } from "@/components/certificate/CertificateDetailClient";
import { getAttendeeByCode } from "@/lib/attendees";

interface CertificatePageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function CertificatePage({
  params,
}: CertificatePageProps) {
  const { code } = await params;
  const attendee = getAttendeeByCode(code);

  if (!attendee || !attendee.checkedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Certificate not found
          </h1>
          <div className="mt-3 text-sm text-gray-600">
            <p>You may not have attended the workshop.</p>
            <p>If you believe this is a mistake, contact at</p>
          </div>
          <a
            className="font-semibold text-blue-600"
            href="mailto:work@ayushmakwana.com"
          >
            work@ayushmakwana.com
          </a>
          .
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-white/20 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-10">
        <CertificateDetailClient attendee={attendee} />
      </div>
    </main>
  );
}
