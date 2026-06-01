import { auth } from '@/auth'
import { NextResponse } from 'next/server'

// El middleware se ejecuta en CADA request antes de llegar a la página
// Aquí es donde implementamos la AUTORIZACIÓN: quién puede acceder a qué
export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn   = !!req.auth // true si hay sesión activa

  // Rutas públicas: no requieren login
  const publicRoutes = ['/', '/login', '/register']
  const isPublic = publicRoutes.includes(pathname)

  // Las rutas de API se protegen desde el propio endpoint, no desde el middleware
  const isApiRoute = pathname.startsWith('/api/')

  // Si no está logueado e intenta acceder a una página protegida → redirige al login
  if (!isLoggedIn && !isPublic && !isApiRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Si ya está logueado e intenta ir al login/register → redirige al inicio
  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
})

// Aplica el middleware a todas las rutas excepto archivos estáticos y API de auth
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
