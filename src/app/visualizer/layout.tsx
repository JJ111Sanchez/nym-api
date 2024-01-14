import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '../header/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nym x Next JS',
  description: 'Nym x Next JS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <Header />
      
        {children}</body>
    </html>
  )
}
