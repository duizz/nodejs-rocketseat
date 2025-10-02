import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryCreateQuestionRepository implements QuestionsRepository {
  public items: Question[] = []

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .splice((page - 1) * 20, page * 20)

    return questions
  }

  async findById(id: string) {
    const questions = this.items.find((item) => item.id.toString() === id)

    if (!questions) {
      return null
    }

    return questions
  }

  async findBySlug(slug: string) {
    const slugs = this.items.find((item) => item.slug.value === slug)

    if (!slugs) {
      return null
    }

    return slugs
  }

  async delete(question: Question) {
    const findIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(findIndex, 1)
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question) {
    const findIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[findIndex] = question
  }
}
