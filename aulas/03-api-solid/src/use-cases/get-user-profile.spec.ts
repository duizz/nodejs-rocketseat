import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'argon2'
import { GetUserProfileUseCase } from './get-user-profile'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from './errors/resource-not-found'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe3@gmail.com',
      password_hash: await hash('123456'),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong profile', async () => {
    await expect(() =>
      sut.execute({
        userId: '482347328748238',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
