import { Answer } from "../entities/answser";

export interface AnswerRepository {
    create(answer: Answer): Promise<void>
}