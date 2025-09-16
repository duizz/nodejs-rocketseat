import { prisma } from '@/lib/prisma'
import { hash } from 'argon2'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'ohndoe@example.com',
      password_hash: await hash('1234567'),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '1234567',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
