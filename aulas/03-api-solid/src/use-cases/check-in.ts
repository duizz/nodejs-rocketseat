import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkIn-repository'

interface CheckInsUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckinsUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInsUseCaseRequest): Promise<CheckinsUseCaseResponse> {
    const checkInSameDate = await this.checkInRepository.findUserOnSameDay(
      userId,
      new Date(),
    )

    if (checkInSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
