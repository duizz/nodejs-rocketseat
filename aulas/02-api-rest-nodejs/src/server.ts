import fastify from "fastify";
import { db } from "./database.js";

const app = fastify();

app.get("/hello", async () => {
    const table = await db('sqlite-schema').select('*')
    return table
})

app.listen({
    port: 3333
}).then(() => console.log("Server HTTP is running!"))