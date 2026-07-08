import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voyager Magazine — WhiteLion Voyage",
  description: "A digital publication exploring African luxury, culture, and the art of journey. Travel, Culture, Food, Fashion, Architecture, Wellness.",
  keywords: ["African luxury", "travel magazine", "culture", "Voyager", "WhiteLion Voyage"],
  authors: [{ name: "WhiteLion Voyage" }],
  openGraph: {
    title: "Voyager Magazine",
    description: "Explore African luxury, culture, and the art of journey.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyager Magazine",
    description: "Explore African luxury, culture, and the art of journey.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0A0A0A] text-[#F2EDE4]">
        {children}
      </body>
    </html>
  );
}
