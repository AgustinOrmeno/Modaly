import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 })
    }

    // Verificamos que el email no esté registrado
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Ya existe una cuenta con ese email' }, { status: 409 })
    }

    // HASHING: nunca guardamos la contraseña en texto plano
    // bcrypt genera un "salt" aleatorio y produce un hash seguro
    // El número 12 es el "cost factor" (más alto = más seguro pero más lento)
    const hashedPassword = await bcrypt.hash(password, 12)

    // Guardamos el usuario con el hash (no la contraseña original)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'user' },
    })

    return NextResponse.json(
      { message: 'Cuenta creada exitosamente', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
