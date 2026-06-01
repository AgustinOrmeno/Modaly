import { PrismaClient } from '@prisma/client'

// Singleton: reutilizamos la misma instancia en desarrollo
// (Next.js recarga módulos en hot-reload y crearía múltiples conexiones)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
