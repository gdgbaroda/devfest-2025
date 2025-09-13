import "./../../app/globals.css";

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
      <body className="h-screen w-screen">{children}</body>
    </html>
  );
}
