import { TRPCProvider } from "./trpc/client";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { HydrateClient } from "./trpc/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TLDraw Editor",
  description: "A simple drawing editor built with Next.js and TLDraw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <HydrateClient>{children}</HydrateClient>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
