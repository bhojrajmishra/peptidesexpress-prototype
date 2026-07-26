import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "@/shared/styles/globals.css";
import { Providers } from "@/shared/components/Providers";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Defcon Peptides — Fast Shipping Australia Wide",
  description: "Quality products with fast dispatch and reliable shipping.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans text-ink antialiased bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
