import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-ins-use-case'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInIdParamSchema = z.object({
    checkInId: z.uuid(),
  })
  const { checkInId } = validateCheckInIdParamSchema.parse(request.params)

  const validateCheckIn = makeValidateCheckInsUseCase()

  await validateCheckIn.execute({
    checkInId,
  })

  return reply.status(204).send()
}
