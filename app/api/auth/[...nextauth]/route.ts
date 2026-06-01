// Este archivo conecta NextAuth con Next.js App Router
// Maneja: POST /api/auth/signin, GET /api/auth/session, etc.
import { handlers } from '@/auth'

export const { GET, POST } = handlers
