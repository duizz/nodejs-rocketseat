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
      latitude: -18.91233674600398,
      longitude: -48.316339712663456,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -18.631007710348555,
      longitude: -48.203147815693804,
    })

    const { nearGym } = await sut.execute({
      userLatitude: -18.91233674600398,
      userLongitude: -48.316339712663456,
    })

    expect(nearGym).toHaveLength(1)
    expect(nearGym).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
