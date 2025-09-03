import fastify from "fastify";
import { env } from "./env/index.js";
import { transactionsRoutes } from "./routes/transactions.js";

const app = fastify();

if(env.NODE_ENV === 'development'){

    app.register(transactionsRoutes, {
        prefix: 'transactions'
    })

    app.listen({
        port: env.PORT || 3333
    }).then(() => console.log("Server HTTP is running!"))

}