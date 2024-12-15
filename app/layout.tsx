import { Inter, Montserrat, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './certificate-styles.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
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
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} bg-gray-100`}>
        <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gilava English Academy</h1>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/verify" className="hover:underline">Verify Certificate</a></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4 mt-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}

