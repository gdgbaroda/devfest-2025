import "./globals.css";
import Background from "@/components/Background";
import SmoothScroll from "@/components/SmoothScroll";
import localFont from "next/font/local";

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
        <link rel="stylesheet" href="https://use.typekit.net/hhw1sjp.css" />
      </head>
      <body className="relative min-h-screen flex flex-col font-google">
        <SmoothScroll />
        <Background />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
