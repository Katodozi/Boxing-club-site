import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import JoinModalProvider from "@/components/JoinModalProvider";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "MaxX Boxing Club — Kathmandu",
  description:
    "A boxing gym in Lalitpur training beginners and fighters under one roof since 2014. Fundamentals, technique, conditioning, sparring, and Fight Team.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- standard <link> fonts used intentionally instead of next/font/google */}
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain" suppressHydrationWarning>
        <SessionProviderWrapper>
          <JoinModalProvider>
            <SiteChrome>{children}</SiteChrome>
          </JoinModalProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
