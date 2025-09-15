import { makeGetUserProfile } from '@/use-cases/factories/make-get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getProfile = makeGetUserProfile()

  const { user } = await getProfile.execute({
    userId: request.user.sub,
  })

  return reply.send({ ...user, password_hash: undefined })
}
