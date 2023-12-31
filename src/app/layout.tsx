import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './header/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nym x NextJs',
  description: 'Nym x Next Js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}</body>
    </html>
  )
}
