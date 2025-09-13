import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  findUserOnSameDay(userId: string, date: Date): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
