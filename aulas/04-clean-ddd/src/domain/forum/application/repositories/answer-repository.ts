import { Answer } from '../../enterprise/entities/answser'

export interface AnswerRepository {
  save(answer: Answer): Promise<void>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
}
