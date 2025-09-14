import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GetGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: GetGymsUseCase

describe('Get Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GetGymsUseCase(gymsRepository)
  })
  it('should be able to get gyms', async () => {
    await gymsRepository.create({
      id: `gym-01`,
      title: 'java script gym',
      description: '',
      phone: '',
      latitude: -18.91233674600398,
      longitude: -48.316339712663456,
    })
    await gymsRepository.create({
      id: `gym-02`,
      title: 'react gym',
      description: '',
      phone: '',
      latitude: -18.91233674600398,
      longitude: -48.316339712663456,
    })

    const { gym } = await sut.execute({ search: 'java script', page: 1 })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'java script gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `react gym ${i}`,
        description: '',
        phone: '',
        latitude: -18.91233674600398,
        longitude: -48.316339712663456,
      })
    }

    const { gym } = await sut.execute({
      search: 'react',
      page: 2,
    })

    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: 'react gym 21' }),
      expect.objectContaining({ title: 'react gym 22' }),
    ])
  })
})
