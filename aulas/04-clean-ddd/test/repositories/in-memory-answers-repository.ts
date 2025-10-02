import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answser'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async delete(answer: Answer) {
    const findIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(findIndex, 1)
  }

  async findById(id: string) {
    const answers = this.items.find((item) => item.id.toString() === id)

    if (!answers) {
      return null
    }

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer) {
    const findIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[findIndex] = answer
  }
}
