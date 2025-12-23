import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creative Mentor AI - Your Personal Storytelling Companion",
  description: "AI-powered storytelling and creative mentorship platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
