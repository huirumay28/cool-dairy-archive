import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Libre_Baskerville, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";

const display = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-display", display: "swap" });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Cool Dairy Archive — Iconic Women's Outfits",
  description: "Moments where what she wore was a cultural moment, carried a feminist message, or is undeniably iconic. Writers, activists, politicians, actresses, musicians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="antialiased">
        <header className="border-b-2 border-black sticky top-0 bg-[#faf8f4] z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-baseline gap-2 whitespace-nowrap shrink-0">
                <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight">cool dairy</span>
                <span className="hidden sm:inline font-mono text-xs text-gray-600">archive</span>
              </Link>
              
              <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm whitespace-nowrap">
                <Link href="/moments" className="hover:underline">
                  Moments
                </Link>
                <Link href="/icons" className="hover:underline">
                  Icons
                </Link>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="border-t-2 border-black mt-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-3">
              <p className="font-mono text-xs uppercase tracking-wider">Sources on every page. We don't invent designers or quotes.</p>
              <p className="text-sm">cool dairy · Huiru Huang · a vintage shop archive · Taipei</p>
              <div className="flex items-center justify-center space-x-4 font-mono text-xs">
                <Link href="/" className="hover:underline">Home</Link>
                <span>·</span>
                <Link href="/moments" className="hover:underline">Moments</Link>
                <span>·</span>
                <Link href="/icons" className="hover:underline">Icons</Link>
                <span>·</span>
                <Link href="/about" className="hover:underline">About</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
