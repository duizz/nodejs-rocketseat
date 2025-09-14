import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeFetchUserCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(checkInRepository)
  return useCase
}
