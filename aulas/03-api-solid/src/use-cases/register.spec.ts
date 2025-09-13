import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { verify } from 'argon2'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyEmailExistsError } from './errors/user-already-email-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe3@gmail.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe3@gmail.com',
      password: '1234567',
    })

    const isPasswordCorrectlyHashed = await verify(
      user.password_hash,
      '1234567',
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('should not be able to register a user with same email', async () => {
    const email = 'johndoe3@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '1234567',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyEmailExistsError)
  })
})
