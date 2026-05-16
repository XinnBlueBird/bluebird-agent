import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  openGraph: {
    title: "BlueBird Agent",
    description:
      "Autonomous AI-driven crypto airdrop research and execution agent.",
    url: "https://bluebird-agent.vercel.app",
    siteName: "BlueBird Agent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueBird Agent",
    description:
      "Autonomous AI-driven crypto airdrop research and execution agent.",
    creator: "@Xinnsky",
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
        {children}
      </body>
    </html>
  );
}
