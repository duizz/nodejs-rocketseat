import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyEmailExistsError } from '@/use-cases/errors/user-already-email-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerSchema.parse(request.body)

  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserCase = new RegisterUseCase(prismaUsersRepository)

  try {
    await registerUserCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyEmailExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
