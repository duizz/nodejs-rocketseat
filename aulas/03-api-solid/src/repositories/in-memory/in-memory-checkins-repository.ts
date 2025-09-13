import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../checkIn-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findManyUser(userId: string, page: number) {
    return this.items
      .filter((index) => index.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findUserOnSameDay(userId: string, date: Date) {
    const startOnDate = dayjs(date).startOf('date')
    const endOnDate = dayjs(date).endOf('date')

    const checkInSameDay = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const verifyCheckInDate =
        checkInDate.isAfter(startOnDate) && checkInDate.isBefore(endOnDate)

      return checkIn.user_id === userId && verifyCheckInDate
    })

    if (!checkInSameDay) {
      return null
    }

    return checkInSameDay
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }
    this.items.push(checkin)

    return checkin
  }
}
