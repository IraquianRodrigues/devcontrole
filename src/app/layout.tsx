import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import {AuthProvider} from "@/providers/auth"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Controle - Seu sistema de gerencimaneto.',
  description: 'Gerencie seus clientes e atendimentos de forma fácil!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
