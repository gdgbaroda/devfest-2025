import "./globals.css";
import localFont from "next/font/local";
import Background from "@/components/Background";
import SmoothScroll from "@/components/SmoothScroll";

const googleFont = localFont({
  src: [
    {
      path: "./fonts/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-font",
  display: "swap",
});

export const metadata = {
  title: "DevFest 2025 | GDG Baroda",
  description:
    "Join us for DevFest 2025 in Baroda - A developer conference by GDG Baroda",
  icons: {
    icon: [
      {
        url: "/gdg_favicon.jpg",
        sizes: "32x32",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${googleFont.variable}`}>
      <head>
        {/* Preload critical resources first */}
        <link
          rel="preload"
          href="/GDG_Baroda_Logo.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/DF25-Logo-Lockup.svg"
          as="image"
          type="image/svg+xml"
        />
        <link rel="preload" href="/Background.png" as="image" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//use.typekit.net" />
        {/* Preconnect to external domains */}
        <link
          rel="preconnect"
          href="https://use.typekit.net"
          crossOrigin="anonymous"
        />
        {/* Load external CSS asynchronously to prevent render blocking */}
        <link
          rel="preload"
          href="https://use.typekit.net/hhw1sjp.css"
          as="style"
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/hhw1sjp.css" />
        </noscript>
      </head>
      <body className="relative min-h-screen flex flex-col font-google">
        <SmoothScroll />
        <Background />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
