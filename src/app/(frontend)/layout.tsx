import React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './styles.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'SINTEH PRO – Industrijska avtomatizacija na ključ',
  description:
    'Hitri zagoni in predvidljivo delovanje. Več kot 30 let izkušenj v industrijski avtomatizaciji, servis ABB in Schneider Electric, industrijska varnost.',
  metadataBase: new URL('https://sinteh.pro'),
  openGraph: {
    title: 'SINTEH PRO – Industrijska avtomatizacija na ključ',
    description:
      'Hitri zagoni in predvidljivo delovanje. Več kot 30 let izkušenj v industrijski avtomatizaciji.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
