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
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'images.gizbot.com' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'beginswithai.com' },
      { protocol: 'https', hostname: 'dalleprodaue.blob.core.windows.net' },
      { protocol: 'https', hostname: 'oaidalleapiprodscus.blob.core.windows.net' },
      { protocol: 'https', hostname: 'cdn.openai.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'assets.aceternity.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'mistral.ai' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'thinglabs.io' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: '1000logos.net' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'www.gstatic.com' },
       { protocol: 'https', hostname: 'swiftask-prod-files.s3.eu-west-3.amazonaws.com' },
      { protocol: 'https', hostname:  'uxwing.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.futurepedia.io' },
      { protocol: 'https', hostname: 'ucarecdn.com' },
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'custom.typingmind.com' },
      // { protocol: 'https', hostname: 'custom.typingmind.com' },



      
     
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
