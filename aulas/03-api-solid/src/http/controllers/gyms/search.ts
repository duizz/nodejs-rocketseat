import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsParams = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { search, page } = searchGymsParams.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gym } = await searchGymUseCase.execute({
    search,
    page,
  })

  return reply.status(200).send({
    gym,
  })
}
