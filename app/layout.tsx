// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
// Import the new wrapper component
import AppWrapper from "../components/AppWrapper"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nokia Rebranded Storefront",
  description: "A Mini E-commerce site for the Nokia brand rebrand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}