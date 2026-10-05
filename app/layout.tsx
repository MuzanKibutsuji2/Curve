import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://curve.dev"),
  title: {
    default: "Curve — the local-first AI execution workspace",
    template: "%s · Curve",
  },
  description:
    "Curve turns goals into controlled, verifiable work by coordinating AI agents, tools and execution environments. It plans, asks permission, executes on your machine through Curve Runner, verifies the result and saves it as a reusable workflow.",
  keywords: [
    "AI execution workspace",
    "AI agent orchestration",
    "local-first AI",
    "coding agent",
    "agent permissions",
    "reusable AI workflows",
    "Curve Runner",
  ],
  openGraph: {
    title: "Curve — the local-first AI execution workspace",
    description:
      "Describe the outcome. Curve plans it, asks permission, executes locally, verifies the result — and proves it did.",
    url: "https://curve.dev",
    siteName: "Curve",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curve — the local-first AI execution workspace",
    description:
      "Describe the outcome. Curve plans it, asks permission, executes locally, verifies the result — and proves it did.",
  },
  icons: {
    icon: [{ url: "/mark.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Scroll-reveal is progressive enhancement: without JS, show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
