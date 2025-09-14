import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, SearchNearbyGymParams } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async searchMany(search: string, page: number) {
    return this.items
      .filter((index) => index.title.includes(search))
      .slice((page - 1) * 20, page * 20)
  }

  async searchManyNearby(params: SearchNearbyGymParams) {
    return this.items.filter((index) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: index.latitude.toNumber(),
          longitude: index.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }
    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((index) => index.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
