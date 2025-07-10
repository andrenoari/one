import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ariful | Web Designer & Developer',
  description: 'Professional web design and development services. Creating beautiful, responsive, and high-performance websites.',
  keywords: ['web design', 'web development', 'portfolio', 'frontend developer', 'UI/UX design'],
  authors: [{ name: 'Ariful Islam', url: 'https://ariful.work' }],
  creator: 'Ariful Islam Khan',
  publisher: 'Ariful Islam Khan',
  metadataBase: new URL('https://ariful.work'),
  openGraph: {
    title: 'Ariful | Web Designer & Developer',
    description: 'Professional web design and development services. Creating beautiful, responsive, and high-performance websites.',
    url: 'https://ariful.work',
    siteName: 'Ariful | Web Designer & Developer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Ariful - Web Designer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ariful | Web Designer & Developer',
    description: 'Professional web design and development services. Creating beautiful, responsive, and high-performance websites.',
    creator: '@andrenoari', // Replace with your Twitter handle
    images: ['/og-image.jpg'], // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png', sizes: 'any' },
    ],
    apple: [
      { 
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
