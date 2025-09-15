import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchNearbyGymsUseCase } from '@/use-cases/factories/make-search-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbySearchSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbySearchSchema.parse(request.query)

  const searchGymUseCase = makeSearchNearbyGymsUseCase()

  const { nearGym } = await searchGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    nearGym,
  })
}
