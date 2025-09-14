import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface GetGymsUseCaseRequest {
  search: string
  page: number
}

interface GetGymsUseCaseResponse {
  gym: Gym[]
}

export class GetGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    search,
    page,
  }: GetGymsUseCaseRequest): Promise<GetGymsUseCaseResponse> {
    const gym = await this.gymRepository.searchMany(search, page)

    return { gym }
  }
}
