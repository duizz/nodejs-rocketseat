import { db } from "../database.js"
import { type FastifyInstance } from "fastify"
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js"

export async function transactionsRoutes(app: FastifyInstance) {

    app.addHook('preHandler', async (request) => {
        console.log(`${[request.method]} ${request.url}`)
        checkSessionIdExists
    })

    app.get("/",async (req) => {

            const { sessionId } = req.cookies

            const transactions = await db('transactions')
                .where('session_id', sessionId)
                .select()

            return { transactions }
        })

    app.get("/:id", async (req) => {
        const transactionParamSchema = z.object({
            id: z.string()
        })

        const { sessionId } = req.cookies

        const { id } = transactionParamSchema.parse(req.params)

        const transaction = await db('transactions')
            .where({
                id,
                session_id: sessionId
            })
            .first()

        return { transaction }
    })

    app.get("/summary", async (req) => {
        const { sessionId } = req.cookies

        const summary = await db('transactions')
            .where('session_id', sessionId)
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

        let sessionId = req.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            })
        }

        await db('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: sessionId
            })

        return reply.status(201).send()
    })
}