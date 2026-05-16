import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/ui/providers";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });



const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rama Sravan | AI Engineer",
  description: "Portfolio of Rama Sravan, an AI Engineer based in Ireland.",
};

import { ViewTransitions } from 'next-view-transitions';
import CommandMenu from "@/components/command-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          "flex min-h-screen flex-col font-sans antialiased relative",
          inter.variable,
          playfair.variable,
          geistMono.variable,
        )}
        >
          {/* Subtle Ambient Grid Background */}
          <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <Providers>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
            <CommandMenu />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}
