import { randomUUID } from "node:crypto"
import { Answer } from "../entities/answser"
import { AnswerRepository } from "../repositories/answer-repository"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestion {

    constructor(private answerRepository: AnswerRepository){}

    async execute({
        instructorId,
        questionId,
        content
    }: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId)
        })

        await this.answerRepository.create(answer)

        return answer
    }
}