import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider'
import { AppStateProvider } from '@/lib/utilsAdvace/app-state'


import { ToasterProvider } from '@/components/toaster-provider';
import { ModalProvider } from '@/components/modal-provider';
import { CrispProvider } from '@/components/crisp-provider';

import { Suspense } from 'react';
import Loading from './loading';

import './globals.css';

import GoogleCaptchaWrapper from './GoogleCaptchaWrapper';


export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00bcd4' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:  {
    default: 'Cogify',
    template: '%s - Cogify',
  },
  description: "Try all new Gemini-2 and other models like o1-preview, gemini-2-flash, GPT-4o, Claude Sonnet, Cohere, Perpexility, Llama3.3, Mistral Large, xAI Grok and services Dall 3 image generation at free and unlimited usage. No ads, no tracking.",
  metadataBase: new URL('https://cogify.social'),
  creator: 'Shubham Sharma',
  openGraph: {
    type: 'website',
    url: 'https://cogify.social',
    title: 'Cogify',
    description: "Try all new Gemini-2 and other models like o1-preview, gemini-2-flash, GPT-4o, Claude Sonnet, Cohere, Perpexility, Llama3.3, Mistral Large, xAI Grok and services Dall 3 image generation at free and unlimited usage. No ads, no tracking.",
    images: [
      {
        url: 'https://cogify.social/logo.png',
        width: 800,
        height: 600,
        alt: 'Cogify Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shubhamsharmaui',
    title: 'Cogify',
    description: "Try all new Gemini-2 and other models like o1-preview, gemini-2-flash, GPT-4o, Claude Sonnet, Cohere, Perpexility, Llama3.3, Mistral Large, xAI Grok and services Dall 3 image generation at free and unlimited usage. No ads, no tracking.",
    images: 'https://cogify.social/logo.png',
  },
  alternates: {
    canonical: 'https://cogify.social',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="shortcut icon" href="/logo.png" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Try all new Gemini-2 and other models like o1-preview, gemini-2-flash, GPT-4o, Claude Sonnet, Cohere, Perpexility, Llama3.3, Mistral Large, xAI Grok and services Dall 3 image generation at free and unlimited usage. No ads, no tracking." />
          <meta name="keywords" content="gemini-2, gemini-2-flash, GPT-4o, Claude, Sonnet, cohere, Perpexility, Llama, xAI Grok, o1-preview,  DALL-E 3, GPT-4o free, Cogify, cogify.social, AI creativity, AI prompt generation, AI text-to-speech, GPT-4o plus internet, AI code generation, AI entertainment, free AI services, unlimited AI, no ads AI, no tracking AI" />
          <meta name="author" content="Shubham Sharma" />

          {/* Open Graph meta tags */}
          <meta property="og:title" content="Cogify" />
          <meta property="og:description" content="Try all new Gemini-2 and other models like o1-preview, gemini-2-flash, GPT-4o, Claude Sonnet, Cohere, Perpexility, Llama3.3, Mistral Large, xAI Grok and services Dall 3 image generation at free and unlimited usage. No ads, no tracking." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://cogify.social" />
          <meta property="og:image" content="https://cogify.social/logo.png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="600" />

          {/* Twitter Card meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@shubhamsharmaui" />
          <meta name="twitter:title" content="Cogify" />
          <meta name="twitter:description" content="Try all new Gemini-2 and other models like o1-preview, gemini-2-flash, GPT-4o, Claude Sonnet, Cohere, Perpexility, Llama3.3, Mistral Large, xAI Grok and services Dall 3 image generation at free and unlimited usage. No ads, no tracking." />
          <meta name="twitter:image" content="https://cogify.social/logo.png" />
        </head>
        <CrispProvider />
          <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            <ToasterProvider />
            
            <ModalProvider />
            <Suspense fallback={<Loading />}> 
            <AppStateProvider> 
              <GoogleCaptchaWrapper>
            {children}
          </GoogleCaptchaWrapper> 
            </AppStateProvider>
            </Suspense>
          </ThemeProvider> 
          
          </body>
        </html>
    </ClerkProvider>
  );
}
