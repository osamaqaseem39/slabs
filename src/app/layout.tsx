import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synovo Labs | AI Development & Web Solutions",
  description: "Synovo Labs specializes in AI development, automation, web & mobile apps (MERN, React, Next.js), CMS development, video editing, graphics design, SEO, and game development. Build intelligent solutions with our expert team.",
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
