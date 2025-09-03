import fastify from "fastify";
import cookie from '@fastify/cookie'
import { env } from "./env/index.js"
import { transactionsRoutes } from "./routes/transactions.js"

const app = fastify();

if(env.NODE_ENV === 'development'){

    app.register(cookie)
    app.register(transactionsRoutes, {
        prefix: 'transactions'
    })

    app.listen({
        port: env.PORT || 3333
    }).then(() => console.log("Server HTTP is running!"))

}