import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  devIndicators: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [{ source: '/__evidence/:path*', destination: 'http://127.0.0.1:3103/:path*' }] : [];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' ws://127.0.0.1:3100; media-src 'self' blob:; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
      ],
    }];
  },
  async redirects() {
    return [
      { source: '/Surjeet_Full_Stack_Resume.pdf', destination: '/Surjeet_Resume.pdf', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about-us.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/cases.html', destination: '/work', permanent: true },
      { source: '/blog.html', destination: '/experience', permanent: true },
      { source: '/contact-us.html', destination: '/contact', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy', permanent: true },
      { source: '/cases/:slug.html', destination: '/work/:slug', permanent: true },
      { source: '/blog/:slug.html', destination: '/journal/:slug', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/cases', destination: '/work', permanent: true },
      { source: '/blog', destination: '/experience', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/cases/:slug', destination: '/work/:slug', permanent: true },
      { source: '/blog/:slug', destination: '/journal/:slug', permanent: true },
    ];
  },
};
export default nextConfig;
