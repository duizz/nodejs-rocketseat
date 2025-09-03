import { db } from "../database.js"
import type { FastifyInstance } from "fastify"
import { randomUUID } from 'node:crypto'
import { string, z } from 'zod'

export async function transactionsRoutes (app: FastifyInstance) {

    app.get("/", async () => { 

        const transactions = await db('transactions')
            .select()

        return { transactions }
    })

    app.get("/:id", async (req) => {
        const transactionParamSchema = z.object({
            id: z.string()
        })

        const { id } = transactionParamSchema.parse(req.params)

        const transaction = await db('transactions')
            .where('id', id)
            .first()

        return { transaction }
    })

    app.get("/summary", async () => {
        const summary = await db('transactions')
            .sum('amount', { as: "amount" })
            .first()

        return { summary }
    })
    

    app.post("/", async (req, reply) => {

        const transactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })
        const { title, amount, type } = transactionBodySchema.parse(req.body)

        await db('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
            })

        return reply.status(201).send()
    })
}