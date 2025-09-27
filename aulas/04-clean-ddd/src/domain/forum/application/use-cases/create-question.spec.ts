import { InMemoryCreateQuestionRepository } from 'test/repositories/in-memory-create-question-repository'
import { CreateQuestionUseCase } from './create-question'

let createQuestionRepository: InMemoryCreateQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    createQuestionRepository = new InMemoryCreateQuestionRepository()
    sut = new CreateQuestionUseCase(createQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: 'conteudo da pergunta',
      title: 'New question',
    })

    expect(question.id).toBeTruthy()
    expect(createQuestionRepository.items[0].id).toEqual(question.id)
  })
})
