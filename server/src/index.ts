import { Elysia, t } from "elysia"
import { example } from "./controllers/example.controller"
import { swaggerConfigs } from "./configs/swagger.configs"
import { tlsConfigs } from "./configs/tls.configs"
import cors from "@elysiajs/cors"

const app = new Elysia()
  .use(cors())
  .use(swaggerConfigs)
  .use(example)
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfigs
  })

let protocol = 'http'
if ('cert' in tlsConfigs)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)