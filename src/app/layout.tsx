import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "POGuard — Never Invoice Against an Expired PO Again",
  description:
    "Automatic alerts when your client POs are about to expire or hit their cap — before your next invoice goes out.",
  openGraph: {
    title: "POGuard — Never Invoice Against an Expired PO Again",
    description:
      "Automatic alerts when your client POs are about to expire or hit their cap — before your next invoice goes out.",
    url: "https://poguard.revexos.com",
    siteName: "POGuard",
    images: [
      {
        url: "https://poguard.revexos.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "POGuard — Never invoice against an expired PO again.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POGuard — Never Invoice Against an Expired PO Again",
    description:
      "Automatic alerts when your client POs are about to expire or hit their cap — before your next invoice goes out.",
    images: ["https://poguard.revexos.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z5L88BB1R0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z5L88BB1R0');
          `}
        </Script>
      </body>
    </html>
  );
}
