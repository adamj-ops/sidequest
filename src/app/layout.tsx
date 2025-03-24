import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/aileron.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OpsFX | Digital Experiences That Matter",
  description: "We create meaningful digital experiences for forward-thinking operations, combining strategic thinking with creative execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-stone-900`}>
        {children}
      </body>
    </html>
  );
}
