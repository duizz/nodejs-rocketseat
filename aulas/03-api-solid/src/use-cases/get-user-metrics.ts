import { ResourceNotFoundError } from './errors/resource-not-found'
import { CheckInRepository } from '@/repositories/checkIn-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    if (!checkInsCount) {
      throw new ResourceNotFoundError()
    }

    return { checkInsCount }
  }
}
