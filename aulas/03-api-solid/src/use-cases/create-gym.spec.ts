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
      latitude: -18.91233674600398,
      longitude: -48.316339712663456,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
