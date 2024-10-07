/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {

    return [
        {
            source: '/api/(dashboard)/(routes)/bing/page.tsx',
            destination: '/app/api/internet/route.ts',
        },
    ];
},


  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'googleusercontent.com' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'beginswithai.com' },
      { protocol: 'https', hostname: 'dalleprodaue.blob.core.windows.net' },
      { protocol: 'https', hostname: 'oaidalleapiprodscus.blob.core.windows.net' },
      { protocol: 'https', hostname: 'cdn.openai.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'assets.aceternity.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ]
  },
  
}
module.exports = {
  
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about-us': { page: '/about-us' },
      '/privacy-policy': { page: '/privacy-policyt', query: { title: 'privacy-policy' } },
      '/feedback': { page: '/feedback', query: { title: 'feedback' } },
      '/help': { page: '/help', query: { title: 'help' } },
      '/join-us': { page: '/join-us', query: { title: 'join us' } },
      '/refund': { page: '/refund', query: { title: 'refund' } },
      '/setting': { page: '/setting', query: { title: 'setting' } },
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },

}

module.exports = nextConfig;
