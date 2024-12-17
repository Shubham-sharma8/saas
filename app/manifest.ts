import type { MetadataRoute } from 'next';
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cogify Social',
    short_name: 'Cogify',
    description: 'Experience the power of AI with  Gemini 2.0Flash (exp, Claude 3.5, DALL-E 3, and more in one chatbot.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    lang: 'en',
    scope: '/',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['tools', 'chat', 'AI', 'productivity'],
    related_applications: [],
    prefer_related_applications: false,
  };
}
