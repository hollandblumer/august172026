import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EWEy — Step Inside the Worlds You Love",
  description: "The participation layer for all IP. Invite audiences in while keeping creative control.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "EWEy — Step Inside the Worlds You Love",
    description: "The participation layer for all IP.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "EWEy — Step inside the worlds you love" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EWEy — Step Inside the Worlds You Love",
    description: "The participation layer for all IP.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
