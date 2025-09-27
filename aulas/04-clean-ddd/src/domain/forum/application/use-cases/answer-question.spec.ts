import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let answerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Answer Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(answerRepository)
  })

  it('should be able to create an answser', async () => {
    const { answer } = await sut.execute({
      content: 'novo conteudo',
      instructorId: '1',
      questionId: '2',
    })

    expect(answer.id).toBeTruthy()
    expect(answerRepository.items[0].id).toEqual(answer.id)
  })
})
