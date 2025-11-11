/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for App Router
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    const crispEnabled = !!process.env.NEXT_PUBLIC_CRISP_ID
    const reactScanEnabled = !!process.env.NEXT_PUBLIC_ENABLE_REACT_SCAN

    const scriptSrc = ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
    const styleSrc = ["'self'", "'unsafe-inline'"]
    const imgSrc = ["'self'", "data:", "blob:"]
    const fontSrc = ["'self'", "data:"]
    const mediaSrc = ["'self'", "blob:"]
    const connectSrc = ["'self'"]
    const frameSrc = ["'self'"]

    if (crispEnabled) {
      scriptSrc.push("https://client.crisp.chat")
      imgSrc.push("https://*.crisp.chat")
      fontSrc.push("https://*.crisp.chat")
      connectSrc.push("https://*.crisp.chat", "wss://*.crisp.chat")
      frameSrc.push("https://*.crisp.chat")
    }

    if (reactScanEnabled) {
      scriptSrc.push("https://cdn.jsdelivr.net")
    }

    const csp = [
      `default-src 'self'`,
      `script-src ${scriptSrc.join(' ')}`,
      `style-src ${styleSrc.join(' ')}`,
      `img-src ${imgSrc.join(' ')}`,
      `font-src ${fontSrc.join(' ')}`,
      `media-src ${mediaSrc.join(' ')}`,
      `connect-src ${connectSrc.join(' ')}`,
      `frame-src ${frameSrc.join(' ')}`,
      `frame-ancestors 'none'`,
      `form-action 'self'`,
      `base-uri 'self'`,
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
