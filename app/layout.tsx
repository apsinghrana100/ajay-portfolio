import type { Metadata } from "next";
import "@/app/globals.css";
import { headers } from "next/headers";
import { getSiteData } from "@/lib/site-data";
import { Inter, Outfit } from "next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-next",
});

const fontDisplay = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-next",
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const { info } = getSiteData(host);

  return {
    title: `${info.name} | Software Engineer`,
    description: `Portfolio for ${info.name} — full-stack engineer specializing in AI systems, scalable backends, and premium interfaces.`,
    robots: { index: false, follow: false },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="bg-bg-void text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
