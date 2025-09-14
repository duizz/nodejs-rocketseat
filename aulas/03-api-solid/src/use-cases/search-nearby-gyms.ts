import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface SearchNearbyGymsUseCaseResponse {
  nearGym: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymsUseCaseRequest): Promise<SearchNearbyGymsUseCaseResponse> {
    const nearGym = await this.gymRepository.searchManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { nearGym }
  }
}
