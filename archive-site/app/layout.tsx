import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <header className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-semibold tracking-tight">cool dairy</span>
                <span className="text-sm text-gray-500">archive</span>
              </Link>
              
              <div className="flex items-center space-x-6">
                <Link href="/moments" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Moments
                </Link>
                <Link href="/icons" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Icons
                </Link>
                <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600 font-medium">Sources on every page. We don't invent designers or quotes.</p>
              <p className="text-sm text-gray-500">cool dairy · Huiru Huang · a vintage shop archive · Taipei</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <span className="text-gray-300">·</span>
                <Link href="/moments" className="text-gray-600 hover:text-gray-900">Moments</Link>
                <span className="text-gray-300">·</span>
                <Link href="/icons" className="text-gray-600 hover:text-gray-900">Icons</Link>
                <span className="text-gray-300">·</span>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
