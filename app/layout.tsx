import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Navigation } from '../components/layout/Navigation'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Sharon Zhang - Healthcare AI Engineer',
    template: '%s | Sharon Zhang'
  },
  description: 'Healthcare AI Engineer specializing in medical devices, chronic disease management, and AI-powered clinical solutions. Building the future of healthcare technology.',
  keywords: [
    'healthcare AI engineer',
    'medical device development',
    'chronic disease management',
    'AI healthcare solutions',
    'medical robotics',
    'healthcare software',
    'Sharon Zhang',
    'Shuran Zhang'
  ],
  authors: [{ name: 'Sharon Zhang' }],
  creator: 'Sharon Zhang',
  metadataBase: new URL('https://sharonzhang.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sharonzhang.dev',
    title: 'Sharon Zhang - Healthcare AI Engineer',
    description: 'Building life-saving medical devices and AI-powered healthcare solutions',
    siteName: 'Sharon Zhang Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sharon Zhang - Healthcare AI Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharon Zhang - Healthcare AI Engineer',
    description: 'Building life-saving medical devices and AI-powered healthcare solutions',
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f59e0b" />
        
        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sharon Zhang",
              alternateName: "Shuran Zhang",
              jobTitle: "Healthcare AI Engineer",
              description: "Full-stack software engineer specializing in medical AI, healthcare devices, and chronic disease management solutions",
              url: "https://sharonzhang.dev",
              image: "https://sharonzhang.dev/images/profile/sharon-professional.jpg",
              sameAs: [
                "https://www.linkedin.com/in/sharonzhang",
                "https://github.com/sharonzhang",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Carina AI",
                description: "Medical AI Company"
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Johns Hopkins University",
                description: "Medical Robotics Program"
              },
              knowsAbout: [
                "Healthcare AI",
                "Medical Device Development",
                "Chronic Disease Management",
                "Medical Robotics",
                "AI Software Engineering",
                "Clinical Decision Support"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased" style={{ backgroundColor: 'var(--color-gray-50)' }}>
        {/* Skip link for accessibility */}
        <a 
          href="#main-content" 
          className="skip-link"
          tabIndex={1}
        >
          Skip to main content
        </a>
        
        <Navigation />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        {/* Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </body>
    </html>
  )
}