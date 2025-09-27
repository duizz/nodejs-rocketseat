import { Answer } from '../../enterprise/entities/answser'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}
