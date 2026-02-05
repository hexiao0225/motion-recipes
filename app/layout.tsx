import type { Metadata } from "next";
import { MotionProvider } from "@/context/MotionContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion Recipes — 10 Subtle UI Microinteractions",
  description:
    "A gallery of 10 production-ready, accessible CSS microinteractions for modern web interfaces.",
  openGraph: {
    title: "Motion Recipes",
    description: "10 Subtle UI Microinteractions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
