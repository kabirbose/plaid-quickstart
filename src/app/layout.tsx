import type { Metadata } from "next";
import { AccessTokenProvider } from "@/context/AccessTokenContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plaid API Test",
  description: "Testing out Plaid API features and implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AccessTokenProvider>{children}</AccessTokenProvider>
      </body>
    </html>
  );
}
