import type { Metadata } from "next";
import { Playfair_Display, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/ui/providers";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { ViewTransitions } from "next-view-transitions";
import CommandMenu from "@/components/command-menu";
import GlitchBackground from "@/components/ui/glitch-background";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rama Sravan Gunda | AI Engineer",
  description: "Portfolio of Rama Sravan Gunda, an AI Engineer based in Ireland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display&display=swap" rel="stylesheet" />
        </head>
        <body
          className={cn(
            "flex min-h-screen flex-col antialiased relative bg-background text-foreground font-sans",
            playfair.variable,
            robotoSlab.variable
          )}
        >
          <Providers>
            <GlitchBackground />
            <Header />
            <main className="grow relative z-10">{children}</main>
            <Footer />
            <CommandMenu />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
