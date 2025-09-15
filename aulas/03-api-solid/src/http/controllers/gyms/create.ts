import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gyms-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymsSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createGymsSchema.parse(request.body)

  const createGymUseCase = makeCreateGymsUseCase()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
