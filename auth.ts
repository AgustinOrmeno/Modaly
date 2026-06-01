import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',      type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },

      // authorize() es donde verificamos identidad (AUTENTICACIÓN)
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }

        // 1. Buscamos el usuario en la base de datos
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null // Usuario no existe

        // 2. Comparamos la contraseña con el hash guardado (bcrypt)
        // bcrypt.compare() nunca revela la contraseña original
        const passwordOk = await bcrypt.compare(password, user.password)
        if (!passwordOk) return null // Contraseña incorrecta

        // 3. Devolvemos los datos del usuario (sin la contraseña)
        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],

  callbacks: {
    // jwt() agrega el rol al token JWT
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    // session() expone el rol al frontend
    session({ session, token }) {
      if (session.user) session.user.role = token.role as string
      return session
    },
  },

  pages: {
    signIn: '/login', // Redirige a nuestro login personalizado
  },
})
