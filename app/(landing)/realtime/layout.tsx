import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { TranslationsProvider } from "@/components/Realtime/translations-context"
import { Banner } from "@/components/Realtime/banner";
import Navbar from "@/components/ui/navbar";




export const metadata: Metadata = {
  title: "OpenAI Realtime",
  description: "Next.js Starter for using the OpenAI Realtime API WebRTC method. Starter showcases capabilities of OpenAI's latest Realtime API (12/17/2024). It has all shadcn/ui components to build your own real-time voice AI application. Fastest & latest way to do Voice AI (Dec 2024), implementing API advancements of Day of OpenAI's 12 days of Christmas.",
  creator: 'Shubham Sharma',
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["AI Blocks", "OpenAI Blocks", "Blocks", "OpenAI Realtime API", "OpenAI Realtime", "OpenAI WebRTC", "Livekit", "OpenAI Realtime WebRTC", "OpenAI Realtime Starter", "Voice AI", "Voice AI components", "web components", "UI components", "UI Library", "shadcn", "aceternity", "AI", "Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript", "Design engineer", "shadcn ai", "cogify", "cogify.social"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationsProvider>
            <div className="relative flex min-h-dvh  flex-col bg-background items-center">
            <Navbar />
              
              <Banner />
              <main className="flex flex-1 justify-center items-start">
                 {children}                     
              </main>
            </div>
            <Toaster />
          </TranslationsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
