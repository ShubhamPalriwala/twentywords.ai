import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import rateLimit from "./utils/rateLimit";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "twentywords.ai",
  description: "Get answers about anything in 20 words with AI",
};

export const limiter = rateLimit();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <html lang="en">
        <body className={nunitoSans.className}>
          {children}
          <Analytics />
        </body>
      </html>
    </>
  );
}
