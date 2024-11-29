import "./globals.css";

export const metadata = {
  title: 'DevFest 2024 | GDG Baroda',
  icons: {
    icon: [
      {
        url: "/gdg_favicon.jpg",
        sizes: "32x32",
      }
    ]
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/hhw1sjp.css"
        />
      </head>
      <body className="relative">
        {children}
      </body>
    </html >
  );
}
