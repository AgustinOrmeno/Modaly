'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) {
      setError('Email o contraseña incorrectos')
    } else {
      router.push('/')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f4f1ed',
      backgroundImage: `radial-gradient(circle at 20% 20%, rgba(180,160,140,0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(180,160,140,0.10) 0%, transparent 50%)`,
      padding: '24px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '48px 44px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 4px 40px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            fontSize: '2.2rem',
            fontWeight: '900',
            letterSpacing: '-1.5px',
            color: '#111',
          }}>
            M<span style={{ color: '#b8967e' }}>.</span>
          </div>
          <div style={{
            fontSize: '0.72rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#bbb',
            marginTop: '4px',
          }}>
            Modaly
          </div>
          <div style={{
            width: '32px',
            height: '2px',
            background: 'linear-gradient(90deg, #b8967e, #d4b5a0)',
            margin: '16px auto 0',
            borderRadius: '2px',
          }} />
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111', marginBottom: '6px', textAlign: 'center' }}>
          Iniciá sesión
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#aaa', textAlign: 'center', marginBottom: '28px' }}>
          Accedé a tu cuenta para continuar
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '6px', letterSpacing: '0.3px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1.5px solid #ebebeb',
                borderRadius: '10px',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#111',
                background: '#fafafa',
              }}
              onFocus={e => { e.target.style.borderColor = '#b8967e'; e.target.style.background = '#fff' }}
              onBlur={e =>  { e.target.style.borderColor = '#ebebeb'; e.target.style.background = '#fafafa' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '6px', letterSpacing: '0.3px' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1.5px solid #ebebeb',
                borderRadius: '10px',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#111',
                background: '#fafafa',
              }}
              onFocus={e => { e.target.style.borderColor = '#b8967e'; e.target.style.background = '#fff' }}
              onBlur={e =>  { e.target.style.borderColor = '#ebebeb'; e.target.style.background = '#fafafa' }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fff5f5',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '10px 13px',
              color: '#dc2626',
              fontSize: '0.83rem',
            }}>
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #111 0%, #333 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '6px',
              letterSpacing: '0.3px',
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: '#aaa' }}>
          ¿No tenés cuenta?{' '}
          <Link href="/register" style={{ color: '#b8967e', fontWeight: '600', textDecoration: 'none' }}>
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
