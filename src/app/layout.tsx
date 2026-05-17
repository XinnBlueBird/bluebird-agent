import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BlueBird Agent — Autonomous Crypto Airdrop Intelligence",
  description:
    "AI-driven autonomous research and execution agent. Discovers, classifies, and farms crypto airdrops 24/7 from 16+ Telegram intelligence sources. Built for the Xiaomi MiMo 100T grant.",
  keywords: [
    "AI agent",
    "crypto airdrop",
    "autonomous agent",
    "Web3",
    "MiMo",
    "Xiaomi MiMo",
    "BlueBird",
  ],
  authors: [{ name: "Xinn Sky", url: "https://x.com/Xinnsky" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "BlueBird Agent",
    description:
      "Autonomous AI-driven crypto airdrop research and execution agent.",
    url: "https://bluebird-agent.vercel.app",
    siteName: "BlueBird Agent",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BlueBird Agent — Autonomous Crypto Airdrop Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueBird Agent",
    description:
      "Autonomous AI-driven crypto airdrop research and execution agent.",
    creator: "@Xinnsky",
    images: ["/og.png"],
  },
  metadataBase: new URL("https://bluebird-agent.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="font-sans antialiased min-h-screen">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
