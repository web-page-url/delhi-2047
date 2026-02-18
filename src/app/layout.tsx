import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://delhi-2047.vercel.app"),
  title: "DELHI 2047: The Last Metro",
  description: "A Survival game set in the tunnels of the Delhi Metro. Stay alive, meet different groups, and find the sky.",
  keywords: ["Delhi 2047", "Delhi Metro", "Post-apocalyptic", "RPG", "Visual Novel", "Survival", "India 2047"],
  authors: [{ name: "Veer" }],
  creator: "Veer",
  publisher: "Veer",
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://delhi-2047.vercel.app",
    title: "DELHI 2047: The Last Metro",
    description: "Navigate the dark tunnels of a broken Delhi in this survival game.",
    siteName: "DELHI 2047",
    images: [
      {
        url: "/icons/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DELHI 2047: The Last Metro Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DELHI 2047: The Last Metro",
    description: "Navigate the dark tunnels of a broken Delhi in this survival game.",
    images: ["/icons/twitter-image.jpg"],
    creator: "Veer",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
