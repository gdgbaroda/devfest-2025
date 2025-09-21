"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface AttendeeData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  ticketType: string;
  ticketNo: string;
  qrCode: string;
}

export default function CertificatePage() {
  const params = useParams();
  const code = params.code as string;
  const [attendee, setAttendee] = useState<AttendeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchAttendeeData = async () => {
      try {
        const response = await fetch(`/api/attendee/${code}`);

        if (response.ok) {
          const data = (await response.json()) as AttendeeData;
          setAttendee(data);
          setIsLoading(false);
        } else {
          setNotFound(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching attendee data:", error);
        setNotFound(true);
        setIsLoading(false);
      }
    };

    if (code) {
      fetchAttendeeData();
    }
  }, [code]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a canvas to generate certificate as image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size for high quality
    canvas.width = 1200;
    canvas.height = 800;

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add certificate content (simplified version)
    ctx.fillStyle = "#1a1a1a";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Participation", canvas.width / 2, 150);

    ctx.font = "32px Arial";
    ctx.fillText("DevFest 2025", canvas.width / 2, 220);

    ctx.font = "36px Arial";
    ctx.fillText(attendee?.name || "", canvas.width / 2, 350);

    ctx.font = "24px Arial";
    ctx.fillText("for participating in DevFest 2025", canvas.width / 2, 420);
    ctx.fillText("October 4-5, 2025 • Baroda, Gujarat", canvas.width / 2, 470);

    // Download the image
    const link = document.createElement("a");
    link.download = `DevFest-2025-Certificate-${attendee?.firstName}-${attendee?.lastName}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (notFound || !attendee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Certificate Not Found
          </h1>
          <p className="text-gray-600">
            The certificate code &quot;{code}&quot; was not found in our
            records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 15mm;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: "Google Sans", system-ui, sans-serif;
          }

          .no-print {
            display: none !important;
          }

          .certificate-container {
            width: 267mm;
            height: 180mm;
            margin: 0;
            padding: 0;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
        }

        @media screen {
          .certificate-container {
            width: 297mm;
            height: 210mm;
            max-width: 100%;
            margin: 0 auto;
            padding: 15mm;
            background: #ffffff;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            font-family: "Google Sans", system-ui, sans-serif;
            box-sizing: border-box;
          }
        }

        /* Google Brand Colors */
        .google-blue {
          color: #4285f4;
        }
        .google-red {
          color: #ea4335;
        }
        .google-yellow {
          color: #fbbc04;
        }
        .google-green {
          color: #34a853;
        }

        .certificate-border {
          border: 3px solid #4285f4;
          border-radius: 12px;
          padding: 15mm 20mm;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(66, 133, 244, 0.1);
        }

        .certificate-header {
          text-align: center;
          border-bottom: 2px solid #4285f4;
          padding-bottom: 8mm;
          margin-bottom: 10mm;
        }

        .certificate-title {
          font-size: 20pt;
          font-weight: 700;
          color: #4285f4;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-family: "Google Sans", system-ui, sans-serif;
        }

        .certificate-subtitle {
          font-size: 11pt;
          color: #666;
          margin: 4pt 0 0 0;
          font-style: italic;
        }

        .certificate-body {
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 5mm 0;
        }

        .award-text {
          font-size: 12pt;
          color: #1a1a1a;
          margin-bottom: 8mm;
          font-weight: 400;
        }

        .recipient-name {
          font-size: 18pt;
          font-weight: 700;
          color: #ea4335;
          margin: 8mm 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid #fbbc04;
          display: inline-block;
          padding-bottom: 3mm;
          max-width: 180mm;
        }

        .participation-text {
          font-size: 11pt;
          color: #1a1a1a;
          margin: 8mm auto;
          line-height: 1.4;
          max-width: 180mm;
          text-align: center;
        }

        .certificate-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 8mm;
          border-top: 2px solid #34a853;
          padding-top: 5mm;
        }

        .signature-section {
          text-align: center;
          width: 50mm;
        }

        .signature-line {
          border-bottom: 1px solid #4285f4;
          margin-bottom: 3mm;
          height: 8mm;
        }

        .signature-text {
          font-size: 8pt;
          color: #666;
          margin: 0;
        }

        .event-details {
          text-align: center;
          flex: 1;
        }

        .event-date {
          font-size: 10pt;
          font-weight: 700;
          color: #4285f4;
          margin: 0;
        }

        .event-location {
          font-size: 9pt;
          color: #666;
          margin: 1mm 0 0 0;
        }

        .certificate-code {
          position: absolute;
          bottom: 5mm;
          right: 5mm;
          font-size: 8pt;
          color: #999;
          font-family: "Courier New", monospace;
        }

        .organizer-info {
          position: absolute;
          bottom: 5mm;
          left: 5mm;
          font-size: 8pt;
          color: #666;
        }

        .google-stripe {
          background: linear-gradient(
            90deg,
            #4285f4,
            #ea4335,
            #fbbc04,
            #34a853
          );
          height: 4px;
          width: 100%;
          margin: 5mm 0;
          border-radius: 2px;
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 py-8 no-print">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
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
              Print Certificate
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PNG
            </button>
          </div>
        </div>
      </div>

      <div className="certificate-container">
        <div className="certificate-border">
          <div className="certificate-header">
            <h1 className="certificate-title">Certificate of Participation</h1>
            <p className="certificate-subtitle">
              DevFest 2025 - Gujarat&apos;s Premier Developer Conference
            </p>
            <div className="google-stripe"></div>
          </div>

          <div className="certificate-body">
            <p className="award-text">This is to certify that</p>
            <h3 className="recipient-name">{attendee.name}</h3>
            <p className="participation-text">
              has successfully participated in DevFest 2025, organized by Google
              Developer Groups Baroda. This certificate acknowledges their
              engagement in learning cutting-edge technologies and contributing
              to the developer community.
            </p>
          </div>

          <div className="certificate-footer">
            <div className="signature-section">
              <div className="signature-line"></div>
              <p className="signature-text">Organizer Signature</p>
            </div>

            <div className="event-details">
              <p className="event-date">October 4-5, 2025</p>
              <p className="event-location">Baroda, Gujarat, India</p>
            </div>

            <div className="signature-section">
              <div className="signature-line"></div>
              <p className="signature-text">Date of Issue</p>
            </div>
          </div>

          <div className="certificate-code">ID: {attendee.qrCode}</div>
          <div className="organizer-info">
            Organized by Google Developer Groups Baroda
          </div>
        </div>
      </div>
    </>
  );
}
