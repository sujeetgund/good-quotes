import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Good Quotes — A small API for better words",
  description: "A curated quote API and MCP service for thoughtful software.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
