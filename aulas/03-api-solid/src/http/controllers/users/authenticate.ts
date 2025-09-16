import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-user'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateSchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
