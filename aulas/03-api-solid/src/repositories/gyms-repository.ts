import { Gym, Prisma } from '@prisma/client'

export interface SearchNearbyGymParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(search: string, page: number): Promise<Gym[]>
  searchManyNearby(params: SearchNearbyGymParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
