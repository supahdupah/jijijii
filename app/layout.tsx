import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'
import { VaseProvider } from '@/context/VaseContext'
import VaseCompletionPopup from '@/components/VaseCompletionPopup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'jijijii - The Flame',
  description: 'ilumina tu camino ProteGE tu fortuna',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔥</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className={`${inter.className} font-body selection:bg-surface-container-high overflow-hidden`}>
        <VaseProvider>
          <Navigation />
          {children}
          <Footer />
          <VaseCompletionPopup />
        </VaseProvider>
      </body>
    </html>
  )
}
