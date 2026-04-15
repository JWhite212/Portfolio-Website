import CustomCursor from "@/components/custom-cursor";
import NoiseOverlay from "@/components/noise-overlay";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { profile } from "@/lib/content";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${profile.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: profile.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceMono.variable}`}>
      <head>
        <link
          rel="dns-prefetch"
          href="https://va.vercel-scripts.com"
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-brutal focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--accent)]">
          Skip to main content
        </a>
        <NoiseOverlay />
        <CustomCursor />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div
            id="main-content"
            className="flex-1">
            {children}
          </div>
          <SiteFooter />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
