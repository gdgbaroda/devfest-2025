"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

export default function QRTicketPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Generate QR code as data URL
    QRCode.toDataURL("https://devfest.gdgbaroda.com/", {
      width: 300,
      margin: 2,
      color: {
        dark: "#232b34",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        setQrCodeUrl(url);
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error("Error generating QR code:", err);
        setIsGenerating(false);
      });
  }, []);

  const handlePrint = () => {
    if (!isGenerating && qrCodeUrl) {
      window.print();
    }
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .no-print {
            display: none !important;
          }

          .print-container {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
          }

          .print-content {
            padding: 20mm;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }

        @media screen {
          .print-container {
            width: 210mm;
            max-width: 100%;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .print-content {
            padding: 20mm;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 py-8 no-print">
        <div className="container mx-auto px-4">
          <button
            onClick={handlePrint}
            disabled={isGenerating || !qrCodeUrl}
            className={`mb-6 px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto ${
              isGenerating || !qrCodeUrl
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {isGenerating ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Preparing QR Code...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print Ticket
              </>
            )}
          </button>
          {isGenerating && (
            <p className="text-center text-gray-600">
              Please wait while we generate your QR code...
            </p>
          )}
        </div>
      </div>

      <div className="print-container">
        <div className="print-content">
          {/* Header with logos */}
          <div className="flex flex-col items-center mb-12">
            <Image
              src="/DF25-Logo-Lockup.svg"
              alt="DevFest 2025"
              width={400}
              height={120}
              className="mb-6"
              priority
            />
            <div className="flex items-center gap-4">
              <Image
                src="/GDG_Baroda_Logo.png"
                alt="GDG Baroda"
                width={180}
                height={60}
                priority
              />
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-4 border-gray-200">
              {isGenerating || !qrCodeUrl ? (
                <div className="w-[300px] h-[300px] flex items-center justify-center">
                  <div className="text-gray-500">Generating QR Code...</div>
                </div>
              ) : (
                <img
                  src={qrCodeUrl}
                  alt="QR Code for DevFest ticket purchase"
                  width={300}
                  height={300}
                  className="block"
                />
              )}
            </div>

            <div className="mt-8 text-center">
              <h1 className="text-4xl font-bold text-[#232b34] mb-4">
                Scan to Buy Tickets
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Get your passes for DevFest 2025
              </p>
              <p className="text-lg text-gray-500">
                The biggest developer conference in Baroda
              </p>
            </div>
          </div>

          {/* Event Details */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-6 text-lg text-gray-700">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">January 25-26, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Baroda, Gujarat</span>
              </div>
            </div>
          </div>

          {/* Website URL */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">Visit our website:</p>
            <p className="text-2xl font-bold text-blue-600">
              devfest.gdgbaroda.com
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-200 py-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">Organized by Google Developer Groups Baroda</p>
            <div className="flex justify-center gap-4 text-sm">
              <span>gdgbaroda.com</span>
              <span>•</span>
              <span>@gdgbaroda</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}