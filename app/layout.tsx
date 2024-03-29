import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'

const inter = Inter({ subsets: ['latin'] })
const localization = {
  socialButtonsBlockButton: "Se connecter avec {{provider|titleize}}"
}

export const metadata: Metadata = {
  title: 'IDE.fr | La plateforme e-learning des professionnels de santé',
  description: 'La plateforme e-learnign des professionnels de santé.',
  icons: '/logo.svg',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="fr">
        <body className={inter.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
