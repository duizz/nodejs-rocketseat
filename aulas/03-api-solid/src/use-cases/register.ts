import { hash } from 'argon2'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyEmailExistsError } from './errors/user-already-email-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyEmailExistsError()
    }

    const password_hash = await hash(password)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
