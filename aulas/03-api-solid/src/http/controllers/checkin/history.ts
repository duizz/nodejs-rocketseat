import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInUseCase } from '@/use-cases/factories/make-fetch-user-check-in-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryBodySchema.parse(request.query)

  const checkInHistory = makeFetchUserCheckInUseCase()

  const { checkIns } = await checkInHistory.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
