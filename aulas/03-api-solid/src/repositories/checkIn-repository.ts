import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  findUserOnSameDay(userId: string, date: Date): Promise<CheckIn | null>
  findManyUser(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
