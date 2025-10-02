import { InMemoryCreateQuestionRepository } from 'test/repositories/in-memory-create-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionUseCase } from './fetch-recents-questions'

let createQuestionRepository: InMemoryCreateQuestionRepository
let sut: FetchRecentQuestionUseCase

describe('Fetch recentw question', () => {
  beforeEach(() => {
    createQuestionRepository = new InMemoryCreateQuestionRepository()
    sut = new FetchRecentQuestionUseCase(createQuestionRepository)
  })

  it('should be able to fetch recents questions', async () => {
    await createQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 18) }),
    )
    await createQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 23) }),
    )
    await createQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 19) }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 19) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recents questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await createQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
