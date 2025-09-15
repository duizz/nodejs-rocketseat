import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchNearbyGymsUseCase

describe('Search Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGymsUseCase(gymsRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: 1,
      longitude: 1,
    })

    const { nearGym } = await sut.execute({
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(nearGym).toHaveLength(1)
    expect(nearGym).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
