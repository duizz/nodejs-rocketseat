import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymRepository)
  })
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'smart fit',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
