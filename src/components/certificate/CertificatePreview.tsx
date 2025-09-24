import type { AttendeeData } from "@/lib/attendees";

interface CertificatePreviewProps {
  attendee: AttendeeData;
  verificationUrl: string;
  qrCodeDataUrl?: string;
}

export function CertificatePreview({
  attendee,
  verificationUrl,
  qrCodeDataUrl,
}: CertificatePreviewProps) {
  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .certificate-print-area {
            width: 267mm !important;
            height: 180mm !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div
        className="certificate-print-area relative m-8 flex h-[210mm] w-[297mm] flex-col overflow-hidden rounded-[28px] border-[12px] border-blue-500 bg-white px-[28mm] py-[24mm] font-google shadow-xl"
        role="img"
        aria-label={`Certificate of participation for ${attendee.name}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply">
          <div className="absolute -left-1/3 top-0 h-[140%] w-[65%] rotate-[18deg] bg-gradient-to-br from-blue-500 via-red-500/80 to-yellow-400" />
          <div className="absolute -right-[20%] bottom-[-18%] h-[120%] w-[55%] rotate-[-12deg] bg-gradient-to-tl from-green-500 via-blue-500/70 to-purple-500/60" />
        </div>

        <div className="relative flex h-full flex-col text-slate-800">
          <header className="flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.65em] text-slate-500">
              Certificate of Participation
            </span>
            <h1 className="text-4xl font-semibold text-blue-600">
              DevFest 2025
            </h1>
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500" />
            <p className="max-w-[420px] text-sm text-slate-600">
              Presented by Google Developer Groups Baroda in recognition of
              dedicated involvement in the region&apos;s premier developer
              conference.
            </p>
          </header>

          <main className="mt-12 flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Awarded to
            </p>
            <p className="max-w-[520px] text-5xl font-semibold text-slate-900">
              {attendee.name}
            </p>
            <p className="max-w-[520px] text-base leading-relaxed text-slate-600">
              for actively participating in sessions, workshops, and community
              programs that empower developers across Gujarat.
            </p>
          </main>

          <footer className="mt-12 flex items-end justify-between gap-8 text-left">
            <div className="flex flex-col gap-4 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Conference
                </p>
                <p className="font-medium text-slate-800">
                  October 4–5, 2025 · Baroda, Gujarat
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Organizer
                </p>
                <p className="font-medium text-slate-800">
                  Google Developer Groups Baroda
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 text-center text-sm text-slate-500">
              <div className="h-[1.5px] w-40 bg-gradient-to-r from-blue-500 to-green-500" />
              <p className="font-medium text-slate-700">Authorized Signatory</p>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-slate-200 bg-white">
                {qrCodeDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrCodeDataUrl}
                    alt={`QR code to verify certificate ${attendee.qrCode}`}
                    className="h-20 w-20 object-contain"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-slate-100 text-[10px] text-slate-400">
                    QR loading…
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                <span className="font-semibold uppercase tracking-wide text-slate-400">
                  Verify AT
                </span>
                <span className="max-w-[180px] break-all text-[11px] text-blue-600">
                  {verificationUrl}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                  ID · {attendee.qrCode}
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
