import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synovo Labs | WordPress Development Services",
  description: "Synovo Labs specializes in WordPress development, SEO, social media marketing, and web design. Grow your online presence with our expert team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
