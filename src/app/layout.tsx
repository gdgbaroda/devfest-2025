import "./globals.css";

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
