import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "옷 관리자",
  description: "의류 상품 관리 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
            <Link href="/products" className="text-lg font-bold text-gray-900">
              옷 관리자
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
