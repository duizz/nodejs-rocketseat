import { app } from "./app.js";
import { env } from "./env/index.js";

app.listen({
    port: env.PORT || 3333
}).then(() => console.log("Server HTTP is running!"))