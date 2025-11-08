import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Marketing Agency | WordPress Development Services",
  description: "Leading digital marketing agency specializing in WordPress development, SEO, social media marketing, and web design. Grow your online presence with our expert team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
