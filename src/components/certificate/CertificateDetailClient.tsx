"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { AttendeeData } from "@/lib/attendees";
import { CertificatePreview } from "./CertificatePreview";

interface CertificateDetailClientProps {
  attendee: AttendeeData;
}

export function CertificateDetailClient({
  attendee,
}: CertificateDetailClientProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | undefined>();
  const [verificationUrl, setVerificationUrl] = useState<string>("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPreparingCertificate, setIsPreparingCertificate] = useState(true);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(true);

  const certificateRef = useRef<HTMLDivElement>(null);

  const isCertificateAvailable = Boolean(attendee.checkedIn);

  const captureCertificateCanvas = useCallback(async () => {
    const target = certificateRef.current;
    if (!target || !isCertificateAvailable) {
      return null;
    }

    const { default: html2canvas } = await import("html2canvas");

    // Wait for next frame so layout settles before capture
    await new Promise((resolve) =>
      requestAnimationFrame(() => resolve(undefined))
    );
    await new Promise((resolve) =>
      requestAnimationFrame(() => resolve(undefined))
    );

    return html2canvas(target, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
  }, [isCertificateAvailable]);

  const renderCertificatePdf = useCallback(async () => {
    const canvas = await captureCertificateCanvas();
    if (!canvas) {
      return null;
    }

    const { default: jsPDF } = await import("jspdf");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageData = canvas.toDataURL("image/png");

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      pageWidth,
      pageHeight,
      "certificate",
      "FAST"
    );

    return pdf;
  }, [captureCertificateCanvas]);

  useEffect(() => {
    const origin = window.location.origin;
    const url = `${origin}/certificate/${attendee.qrCode}`;
    setVerificationUrl(url);

    let isMounted = true;
    setQrCodeDataUrl(undefined);
    setIsPreparingCertificate(true);
    setPreviewImageUrl(null);
    setIsGeneratingPreview(true);

    if (!isCertificateAvailable) {
      setIsPreparingCertificate(false);
      setIsGeneratingPreview(false);
      return () => {
        isMounted = false;
      };
    }

    void (async () => {
      try {
        const { default: QRCode } = await import("qrcode");
        const dataUrl = await QRCode.toDataURL(url, {
          width: 256,
          margin: 1,
          errorCorrectionLevel: "H",
        });

        if (isMounted) {
          setQrCodeDataUrl(dataUrl);
        }
      } catch (error) {
        console.error("Failed to generate QR code", error);
        if (isMounted) {
          setQrCodeDataUrl(undefined);
        }
      } finally {
        if (isMounted) {
          setIsPreparingCertificate(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [attendee.qrCode, isCertificateAvailable]);

  useEffect(() => {
    if (!isCertificateAvailable || !qrCodeDataUrl) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        setIsGeneratingPreview(true);
        const canvas = await captureCertificateCanvas();
        if (cancelled) {
          return;
        }
        if (!canvas) {
          setPreviewImageUrl(null);
          setIsGeneratingPreview(false);
          return;
        }
        setPreviewImageUrl(canvas.toDataURL("image/png"));
      } catch (error) {
        console.error("Failed to render certificate preview", error);
        if (!cancelled) {
          setPreviewImageUrl(null);
        }
      } finally {
        if (!cancelled) {
          setIsGeneratingPreview(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [captureCertificateCanvas, isCertificateAvailable, qrCodeDataUrl]);

  const handleDownloadPdf = async () => {
    if (!isCertificateAvailable) {
      return;
    }

    try {
      setIsGeneratingPdf(true);
      const pdf = await renderCertificatePdf();
      if (!pdf) {
        return;
      }

      pdf.save(
        `DevFest-2025-Certificate-${attendee.firstName || attendee.name}.pdf`
      );
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadPng = () => {
    if (!previewImageUrl || !isCertificateAvailable) {
      return;
    }

    const link = document.createElement("a");
    link.href = previewImageUrl;
    link.download = `DevFest-2025-Certificate-${
      attendee.firstName || attendee.name
    }.png`;
    link.click();
  };

  if (!isCertificateAvailable) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-gray-200 bg-white/80 p-12 text-center shadow-sm">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Certificate not found
          </h1>
          <p className="text-sm text-gray-600">
            You may not have attended the workshop. If you believe this is a
            mistake, contact{" "}
            <a
              className="font-semibold text-blue-600"
              href="mailto:work@ayushmakwana.com"
            >
              work@ayushmakwana.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-source {
            position: static !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
        }
      `}</style>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
        <aside className="no-print order-1 flex flex-col gap-8 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-white/40 bg-white/80 p-8 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <div className="mb-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                Certificate
              </p>
              <h1 className="text-2xl font-semibold text-gray-900">
                Certificate of Participation
              </h1>
              <p className="text-sm text-gray-600">
                Issued for outstanding engagement at DevFest 2025.
              </p>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Recipient
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {attendee.name}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Ticket Type
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {attendee.ticketType || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Date of Issue
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  4th October 2025
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Verification ID
                </dt>
                <dd className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-800">
                  {attendee.qrCode}
                </dd>
              </div>
            </dl>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={
                  isPreparingCertificate ||
                  isGeneratingPreview ||
                  !previewImageUrl
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGeneratingPreview ? "Preparing PNG…" : "Download PNG"}
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf || isPreparingCertificate}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGeneratingPdf || isPreparingCertificate
                  ? "Preparing…"
                  : "Download PDF"}
              </button>
            </div>
          </div>
        </aside>

        <section className="order-2 flex flex-col gap-4">
          <div className="rounded-2xl border border-white/40 bg-white/75 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-[200px]">
                <p className="text-sm font-semibold text-gray-900">
                  Certificate preview
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              {isGeneratingPreview ? (
                <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white/90 p-10 text-sm text-gray-500 shadow-inner">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  <p>Rendering certificate preview…</p>
                </div>
              ) : previewImageUrl ? (
                <div className="w-full">
                  <div className="aspect-[1122/794] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewImageUrl}
                      alt={`Certificate preview for ${attendee.name}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white/90 p-10 text-sm text-gray-500 shadow-inner">
                  <p>Preview unavailable. Try downloading the PDF instead.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <div
        ref={certificateRef}
        className="print-source pointer-events-none fixed left-[-2000px] top-0 z-[-1]"
        aria-hidden="true"
      >
        <CertificatePreview
          attendee={attendee}
          verificationUrl={verificationUrl}
          qrCodeDataUrl={qrCodeDataUrl}
        />
      </div>
    </>
  );
}
