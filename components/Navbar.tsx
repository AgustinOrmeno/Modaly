'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

// La Navbar muestra distintas opciones según si el usuario está logueado o no
// Esto es AUTORIZACIÓN visual: cada rol ve lo que le corresponde
export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav style={{
      background: '#111',
      color: '#fff',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Modaly
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {status === 'loading' && (
          <span style={{ color: '#888', fontSize: '0.9rem' }}>...</span>
        )}

        {/* Usuario NO logueado */}
        {status === 'unauthenticated' && (
          <>
            <Link href="/login"    style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Ingresar</Link>
            <Link href="/register" style={{ color: '#fff', background: '#fff', color: '#111', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Registrarse</Link>
          </>
        )}

        {/* Usuario logueado */}
        {status === 'authenticated' && session && (
          <>
            <span style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Hola, {session.user?.name}
              {session.user?.role === 'admin' && (
                <span style={{ background: '#f59e0b', color: '#000', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>
                  ADMIN
                </span>
              )}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{ background: 'transparent', border: '1px solid #555', color: '#ccc', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Salir
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
