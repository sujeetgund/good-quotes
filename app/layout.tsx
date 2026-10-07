import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Good Quotes — A small API for better words",
  description: "A curated quote API and MCP service for thoughtful software.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#181818",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#181818] text-white selection:bg-[#da291c] selection:text-white">
        {children}
      </body>
    </html>
  );
}
