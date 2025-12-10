import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({ subsets: ["latin"] })

// SEO Meta Tags
export const metadata: Metadata = {
  title: {
    default: "Certificate Portfolio | Chayanan Lakad",
    template: "%s | Certificate Portfolio"
  },
  description: "Showcasing skills & achievements through professional certifications",
  keywords: [
    "portfolio",
    "certificates",
    "achievements",
    "web development",
    "frontend developer",
    "internship",
    "react",
    "next.js",
    "typescript"
  ],
  authors: [{ name: "Chayanan Lakad" }],
  creator: "Chayanan Lakad",
  publisher: "Chayanan Lakad",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chayananportfolio.vercel.app/",
    siteName: "Certificate Portfolio",
    title: "Certificate Portfolio | Chayanan Lakad",
    description: "Showcasing professional certificates and achievements",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Certificate Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificate Portfolio | Chayanan Lakad",
    description: "Showcasing professional certificates and achievements",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  )
}
