import "./../../app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hhw1sjp.css" />
      </head>
      <body className="relative">{children}</body>
    </html>
  );
}
