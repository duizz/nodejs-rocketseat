import { Answer } from "../entities/anwser"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestion {
    execute({
        instructorId,
        questionId,
        content
    }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer(content)

        return answer
    }
}