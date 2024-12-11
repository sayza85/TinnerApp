import Elysia, { error, t } from "elysia"
import { file } from 'bun'
import { PhotoDto } from "../types/photo.type"
import { AuthMiddleWare, AuthPayload } from '../middleware/auth.middlewar'
import { PhotoService } from "../services/photo.services"



export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ["Photo"]
})
    .use(PhotoDto)
    .use(AuthMiddleWare)

    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error("someting eiei")
        }

    }, {
        detail: { summary: "Upload Photo" },
        body: "upload",
        response: "photo",
        isSignIn: true

    })