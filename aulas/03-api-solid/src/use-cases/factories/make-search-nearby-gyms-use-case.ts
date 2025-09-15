import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchNearbyGymsUseCase } from '../search-nearby-gyms'

export function makeSearchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchNearbyGymsUseCase(gymsRepository)
  return useCase
}
