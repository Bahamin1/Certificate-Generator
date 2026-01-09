import { Inter, Montserrat, Playfair_Display, Pinyon_Script } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})
const pinyon = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
})

export const metadata = {
  title: 'Gilava English Academy Certificate Generator',
  description: 'Generate professional English language certificates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${inter.className} ${playfair.variable} ${montserrat.variable} ${pinyon.variable} font-sans bg-gray-900 text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}

