import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider'
import { AppStateProvider } from '@/lib/utilsAdvace/app-state'


import { ToasterProvider } from '@/components/toaster-provider';
import { ModalProvider } from '@/components/modal-provider';
import { CrispProvider } from '@/components/crisp-provider';
import GoogleCaptchaWrapper from './GoogleCaptchaWrapper';


import './globals.css';



export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00bcd4' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:  {
    default: 'Cogify.Social- Get Unlimited AI Generation for free',
    template: '%s - Cogify',
  },
  keywords: ["cogify.social", "openAI", "generative AI", "AI Tools", "Claude", "Gemini", "AI Text Generation", "AI Image Generation", "no-ads ai", "realtime ai", "web ai"],

  description: "Enjoy unlimited AI-generated text and images without ads on Cogify.Social, featuring models like Claude 3.5, O1-Preview, Gemini-2, and DALL-E 3..",
  metadataBase: new URL('https://cogify.social'),
  creator: 'Shubham Sharma',
  openGraph: {
    type: 'website',
    url: 'https://cogify.social',
    title: 'Cogify',
    description: "Enjoy unlimited AI-generated text and images without ads on Cogify.Social, featuring models like Claude 3.5, O1-Preview, Gemini-2, and DALL-E 3.",
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
    description: "Enjoy unlimited AI-generated text and images without ads on Cogify.Social, featuring models like Claude 3.5, O1-Preview, Gemini-2, and DALL-E 3.",
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
   
      <html lang="en" suppressHydrationWarning>
        <head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-62YCN954BN"></script>
          <script id='google-analytics'> {` window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-62YCN954BN'); `}</script>
          <link rel="shortcut icon" href="/logo.png" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Claude 3.5, O1-Preview, Gemini-2, DALL-E 3, GPT-Realtime, and more. Enjoy unlimited generations, including text and images, without ads" />
          <meta name="keywords" content="gemini-2, gemini-2-flash, GPT-4o, Claude, Sonnet, cohere, Perpexility, Llama, xAI Grok, o1-preview,  DALL-E 3, GPT-4o free, Cogify, cogify.social, AI creativity, AI prompt generation, AI text-to-speech, GPT-4o plus internet, AI code generation, AI entertainment, free AI services, unlimited AI, no ads AI, no tracking AI" />
          <meta name="author" content="Shubham Sharma" />

          {/* Open Graph meta tags */}
          <meta property="og:title" content="Cogify" />
          <meta property="og:description" content="Claude 3.5, O1-Preview, Gemini-2, DALL-E 3, GPT-Realtime, and more. Enjoy unlimited generations, including text and images, without ads" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://cogify.social" />
          <meta property="og:image" content="https://cogify.social/logo.png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="600" />

          {/* Twitter Card meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@shubhamsharmaui" />
          <meta name="twitter:title" content="Cogify" />
          <meta name="twitter:description" content="Claude 3.5, O1-Preview, Gemini-2, DALL-E 3, GPT-Realtime, and more. Enjoy unlimited generations, including text and images, without ads" />
          <meta name="twitter:image" content="https://cogify.social/logo.png" />
        
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
           
            <AppStateProvider> 
            <ClerkProvider>
            <GoogleCaptchaWrapper>
            {children}
            </GoogleCaptchaWrapper> 
          </ClerkProvider>
            </AppStateProvider>
           
          </ThemeProvider> 
          
          </body>
          </head>
        </html>
   
  );
}
