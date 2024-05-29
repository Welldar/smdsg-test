import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Test Zheryakov',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-3`}>{children}</body>
    </html>
  )
}
