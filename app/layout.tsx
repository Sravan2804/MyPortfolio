import type { Metadata } from "next";
import { Playfair_Display, Roboto_Slab, Sedgwick_Ave_Display } from "next/font/google";
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

const sedgwick = Sedgwick_Ave_Display({
  weight: "400",
  variable: "--font-sedgwick",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ramasravan.dev'),
  title: {
    default: "Rama Sravan Gunda | AI Engineer",
    template: "%s | Rama Sravan Gunda",
  },
  description: "Portfolio of Rama Sravan Gunda, an AI Engineer based in Ireland specializing in Computer Vision, Autonomous Agents, and ML Systems.",
  keywords: ["AI Engineer", "Computer Vision", "Machine Learning", "Deep Learning", "LangGraph", "YOLOv8", "PyTorch", "Rama Sravan Gunda"],
  authors: [{ name: "Rama Sravan Gunda", url: "https://github.com/Sravan2804" }],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://ramasravan.dev",
    title: "Rama Sravan Gunda | AI Engineer",
    description: "Portfolio of Rama Sravan Gunda, an AI Engineer based in Ireland specializing in Computer Vision, Autonomous Agents, and ML Systems.",
    siteName: "Rama Sravan Gunda Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rama Sravan Gunda | AI Engineer",
    description: "Portfolio of Rama Sravan Gunda, an AI Engineer based in Ireland.",
    creator: "@rama_sravan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "flex min-h-screen flex-col antialiased relative bg-background text-foreground font-sans",
            playfair.variable,
            robotoSlab.variable,
            sedgwick.variable
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
