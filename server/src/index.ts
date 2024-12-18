import { Elysia, t } from "elysia"
import { example } from "./controllers/example.controller"
import { swaggerConfigs } from "./configs/swagger.configs"
import { tlsConfigs } from "./configs/tls.configs"
import cors from "@elysiajs/cors"
import { MongoDB } from "./configs/database.configs"
import { jwtConfig } from "./configs/jwt.configs"
import { AccountController } from "./controllers/account.controllers"
import { Usercontroller } from './controllers/user.controller'
import staticPlugin from "@elysiajs/static"
import { PhotoController } from "./controllers/photo.controllers"
import { LikeController } from "./controllers/like.controllers"

MongoDB.connect()

const app = new Elysia()

  .use(cors())
  .use(jwtConfig)
  .use(swaggerConfigs)
  .use(example)
  .use(AccountController)
  .use(Usercontroller)
  .use(PhotoController)
  .use(LikeController)
  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfigs
  })

let protocol = 'http'
if ('cert' in tlsConfigs)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)