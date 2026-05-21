import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waltapp.vercel.app"),
  title: "Walt | Privacy-First Expense Tracker",
  description: "Take control of your finances with Walt. A 100% private, local-first Android app for tracking expenses and income with zero data collection.",
  keywords: ["expense tracker", "privacy-first", "finance app", "budgeting", "android expense tracker", "local-first app", "walt"],
  authors: [{ name: "Walt Team" }],
  openGraph: {
    title: "Walt | Privacy-First Expense Tracker",
    description: "Your financial data belongs to you. Track expenses locally with Walt.",
    url: "https://waltapp.vercel.app",
    siteName: "Walt",
    images: [
      {
        url: "/screenshots/home.png",
        width: 1080,
        height: 2424,
        alt: "Walt App Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Walt | Privacy-First Expense Tracker",
    description: "The most private way to track your expenses on Android.",
    images: ["/screenshots/home.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
