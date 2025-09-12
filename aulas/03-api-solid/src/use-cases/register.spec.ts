import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { verify } from 'argon2'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyEmailExistsError } from './errors/user-already-email-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe3@gmail.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'johndoe3@gmail.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '1234567',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyEmailExistsError)
  })
})
