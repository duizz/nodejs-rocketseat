import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkIn-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyUser(userId, page)

    if (!checkIns) {
      throw new ResourceNotFoundError()
    }

    return { checkIns }
  }
}
