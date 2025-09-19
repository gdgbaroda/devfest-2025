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
      width: 320,
      margin: 2,
      color: {
        dark: "#000000",
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

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: 'Google Sans', system-ui, sans-serif;
          }

          .no-print {
            display: none !important;
          }

          .print-container {
            width: 210mm;
            height: 297mm;
            padding: 15mm;
            margin: 0;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
        }

        @media screen {
          .print-container {
            width: 210mm;
            height: 297mm;
            max-width: 100%;
            margin: 0 auto;
            padding: 15mm;
            background: linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            font-family: 'Google Sans', system-ui, sans-serif;
            box-sizing: border-box;
          }
        }

        /* Google Brand Colors */
        .google-blue { color: #4285F4; }
        .google-red { color: #EA4335; }
        .google-yellow { color: #FBBC04; background: #FBBC04; }
        .google-green { color: #34A853; }

        .header-section {
          background: white;
          padding: 15px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 4px solid #4285F4;
        }

        .title-text {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .subtitle-text {
          font-size: 14px;
          color: #666;
          margin: 4px 0 0 0;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 15px;
        }

        .qr-section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border: 2px solid #4285F4;
          width: 100%;
        }

        .qr-wrapper {
          display: inline-block;
          padding: 12px;
          background: white;
          border: 2px solid #4285F4;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(66, 133, 244, 0.15);
        }

        .qr-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 15px 0 8px 0;
        }

        .qr-url {
          font-size: 16px;
          color: #4285F4;
          font-weight: 600;
          margin: 8px 0;
        }

        .register-btn {
          background: #34A853;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          margin: 12px 0;
          box-shadow: 0 2px 8px rgba(52, 168, 83, 0.3);
        }

        .info-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .date-card {
          background: #4285F4;
          color: white;
          padding: 18px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(66, 133, 244, 0.25);
        }

        .date-label {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .date-value {
          font-size: 20px;
          font-weight: 900;
        }

        .venue-card {
          background: white;
          border-left: 4px solid #34A853;
          padding: 15px 18px;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .venue-label {
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .venue-value {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .highlights {
          background: white;
          padding: 18px;
          border-radius: 12px;
          border: 2px solid #34A853;
          box-shadow: 0 4px 16px rgba(52, 168, 83, 0.12);
          grid-column: 1 / -1;
          width: 100%;
        }

        .highlights-title {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          text-align: center;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          font-size: 12px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          color: #333;
          padding: 3px 0;
        }

        .check-mark {
          color: #34A853;
          margin-right: 6px;
          font-weight: bold;
          font-size: 14px;
        }

        .footer-section {
          background: white;
          padding: 12px 18px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-right: 4px solid #EA4335;
        }

        .organizer {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .organizer-text {
          font-size: 11px;
          color: #666;
          margin-bottom: 2px;
          font-weight: 500;
        }

        .organizer-name {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .contact-info {
          text-align: right;
          font-size: 11px;
          color: #666;
          line-height: 1.4;
          font-weight: 500;
        }
      `}</style>

      <div className="bg-gray-100 py-8 no-print">
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
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Preparing QR Code...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print A4 QR Page
              </>
            )}
          </button>
        </div>
      </div>

      <div className="print-container">
        {/* Header */}
        <div className="header-section">
          <div>
            <h1 className="title-text google-blue">GDG Baroda: Devfest 2025</h1>
            <p className="subtitle-text">Not just another tech conference</p>
          </div>
          <Image
            src="/DF25-Logo-Lockup.svg"
            alt="DevFest 2025"
            width={140}
            height={42}
            priority
          />
        </div>

        {/* Main Content - Vertical Layout */}
        <div className="main-content">
          {/* QR Code Section - Centered */}
          <div className="qr-section">
            <div className="qr-wrapper">
              {isGenerating || !qrCodeUrl ? (
                <div className="w-[320px] h-[320px] flex items-center justify-center">
                  <div className="text-gray-500">Generating...</div>
                </div>
              ) : (
                <Image
                  src={qrCodeUrl}
                  alt="DevFest 2025 Registration QR"
                  width={320}
                  height={320}
                  className="block"
                  unoptimized
                />
              )}
            </div>
            <p className="qr-title">Scan to Register</p>
            <p className="qr-url">devfest.gdgbaroda.com</p>
            <div className="register-btn">Register Now - Limited Seats!</div>
          </div>

          {/* Event Info Section */}
          <div className="info-section">
            {/* Date */}
            <div className="date-card">
              <div className="date-label">EVENT DATE</div>
              <div className="date-value">4-5 October 2025</div>
            </div>

            {/* Venue */}
            <div className="venue-card">
              <div className="venue-label">VENUE</div>
              <div className="venue-value">📍 Sayaji Hotel Vadodara</div>
            </div>

            {/* Highlights */}
            <div className="highlights">
              <div className="highlights-title">What You&apos;ll Experience</div>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <span className="check-mark">🚀</span>
                  Expert Tech Talks
                </div>
                <div className="highlight-item">
                  <span className="check-mark">💻</span>
                  Hands-on Workshops
                </div>
                <div className="highlight-item">
                  <span className="check-mark">🤝</span>
                  Networking Sessions
                </div>
                <div className="highlight-item">
                  <span className="check-mark">🎁</span>
                  Swag & Food
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <div className="organizer">
            <Image
              src="/GDG_Baroda_Logo.png"
              alt="GDG Baroda"
              width={100}
              height={32}
              priority
            />
            <div>
              <div className="organizer-text">Organized by</div>
              <div className="organizer-name">Google Developer Groups Baroda</div>
            </div>
          </div>
          <div className="contact-info">
            <div>🌐 gdgbaroda.com</div>
            <div>📱 @gdgbaroda</div>
            <div>📧 Contact us</div>
          </div>
        </div>
      </div>
    </>
  );
}