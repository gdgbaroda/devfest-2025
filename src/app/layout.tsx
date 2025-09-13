import "./globals.css";
import Background from "@/components/Background";
import SmoothScroll from "@/components/SmoothScroll";

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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hhw1sjp.css" />
      </head>
      <body className="relative min-h-screen flex flex-col">
        <SmoothScroll />
        <Background />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
