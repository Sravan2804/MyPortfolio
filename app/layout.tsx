import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/ui/providers";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { ViewTransitions } from "next-view-transitions";
import CommandMenu from "@/components/command-menu";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
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
        <body
          className={cn(
            "flex min-h-screen flex-col antialiased relative bg-background text-foreground",
            playfair.variable
          )}
        >
          <Providers>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
            <CommandMenu />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
