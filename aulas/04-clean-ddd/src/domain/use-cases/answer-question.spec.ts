import { AnswerQuestion } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answser'

const fakeAnswerRepository: AnswerRepository  = {
    create: async (answer: Answer) =>  {
        return
    }
}

test('create an answser', async () => {

    const answerQuestion = new AnswerQuestion(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
        content: "Nova resposta",
        instructorId: "f6be25d6-8f52-4124-8d22-73c42b6fb392",
        questionId: "ad7d6c14-c16c-478f-8c04-e02bfa3dfde0",
    })

    expect(answer.content).toEqual('Nova resposta')
})
