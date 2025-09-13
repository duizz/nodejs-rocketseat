import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkIn-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface CheckInsUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinsUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInsUseCaseRequest): Promise<CheckinsUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )
    const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 meters

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error('distance avoid than 100 metros')
    }

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
