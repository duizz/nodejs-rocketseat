import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-numbers-of-check-ins-error'

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-id-1',
      description: 'smart fit',
      latitude: -18.91233674600398,
      longitude: -48.316339712663456,
      phone: '',
      title: 'academia 1',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -18.91233674600398,
      userLongitude: -48.316339712663456,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2025, 8, 13, 20, 3))

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -18.91233674600398,
      userLongitude: -48.316339712663456,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id-1',
        gymId: 'gym-id-1',
        userLatitude: -18.91233674600398,
        userLongitude: -48.316339712663456,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 8, 13, 0, 0))

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -18.91233674600398,
      userLongitude: -48.316339712663456,
    })

    vi.setSystemTime(new Date(2025, 8, 14, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -18.91233674600398,
      userLongitude: -48.316339712663456,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-02',
      title: 'smart fit',
      description: '',
      phone: '',
      latitude: new Decimal(-18.91233674600398),
      longitude: new Decimal(-48.316339712663456),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id-1',
        gymId: 'gym-02',
        userLatitude: -18.930406428741527,
        userLongitude: -48.30729555831068,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
