import { InMemoryCreateQuestionRepository } from 'test/repositories/in-memory-create-question-repository'
import { GetQuestionBySlug } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { title } from 'process'

let createQuestionRepository: InMemoryCreateQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    createQuestionRepository = new InMemoryCreateQuestionRepository()
    sut = new EditQuestionUseCase(createQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    createQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      content: 'content example',
      title: 'title example',
    })

    expect(createQuestionRepository.items[0]).toMatchObject({
      content: 'content example',
      title: 'title example',
    })
  })

  it('should not be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await createQuestionRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        content: 'content example',
        title: 'title example',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
