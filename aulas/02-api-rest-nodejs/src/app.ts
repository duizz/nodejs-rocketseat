import fastify from "fastify";
import cookie from '@fastify/cookie'
import { env } from "./env/index.js"
import { transactionsRoutes } from "./routes/transactions.js"

export const app = fastify();

app.register(cookie)
app.register(transactionsRoutes, {
    prefix: 'transactions'
})
