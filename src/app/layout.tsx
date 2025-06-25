import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Have some cat wisdom",
  description: "A cat wisdom a day keeps the vet away",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-8 min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-grow">
            <SessionProvider>{children}</SessionProvider>
            <SpeedInsights />
          </main>
        </ThemeProvider>
        <footer className="mt-10 py-4 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Cat Wisdom. Made with love by your
          master. All rights reserved.{" "}
          <a href="/unsubscribe" className="underline">
            Unsubscribe
          </a>
        </footer>
      </body>
    </html>
  );
}
