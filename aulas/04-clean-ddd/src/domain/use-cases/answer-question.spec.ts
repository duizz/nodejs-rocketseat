import { expect, test } from 'vitest'
import { AnswerQuestion } from './answer-question'

test('create an answser', () => {

    const answer = new AnswerQuestion().execute({
        content: "Nova resposta",
        instructorId: "1",
        questionId: "2"
    })

    expect(answer.content).toEqual('Nova resposta')
})
