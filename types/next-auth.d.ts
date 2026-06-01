import 'next-auth'

// Extendemos los tipos de NextAuth para incluir el campo "role"
declare module 'next-auth' {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      role?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}
