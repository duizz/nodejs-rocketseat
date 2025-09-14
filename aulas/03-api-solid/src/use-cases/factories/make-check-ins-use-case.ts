import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeCheckInUseCase() {
  const prismaCheckInRepository = new PrismaCheckInRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const checkInsUseCase = new CheckInUseCase(
    prismaCheckInRepository,
    prismaGymsRepository,
  )
  return checkInsUseCase
}
