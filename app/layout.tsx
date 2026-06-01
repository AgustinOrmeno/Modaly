import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Modaly - Buscador de ropa en Argentina',
  description: 'Buscá prendas en las principales tiendas de Argentina',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#f5f5f5' }}>
        {/* SessionProvider hace que la sesión esté disponible en todo el app */}
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
