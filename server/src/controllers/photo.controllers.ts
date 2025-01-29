import Elysia, { error, t } from "elysia"
import { PhotoDto } from "../types/photo.type"
import { AuthMiddleWare, AuthPayload } from '../middleware/auth.middlewar'
import { PhotoService } from "../services/photo.services"
import { file } from 'bun'




export const PhotoController = new Elysia({
    prefix: "api/photo/",
    tags: ["Photo"]
})
    .use(PhotoDto)
    .use(AuthMiddleWare)

    .patch('/:photo_id', async ({ params: { photo_id }, Auth, set }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await PhotoService.setAvatar(photo_id, user_id)
            set.status = "Bad Request"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("someting eiei")
        }
    }, {
        detail: { summary: "Set Avatar" },
        isSignIn: true,
        params: "photo_id"
    })

    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = "No Content"

        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("someting eiei")
        }
    }
        , {
            detail: { summary: "Delete photo by photo_id" },
            isSignIn: true,
            params: "photo_id"
        })


    .get('/', async ({ Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await PhotoService.getPhotos("")
    }, {
        detail: { summary: "Get photo[] by user_id" },
        isSignIn: true,
        response: "photos"
    })
    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("someting eiei")
        }

    }, {
        detail: { summary: "Upload Photo" },
        body: "_upload",
        response: "photo",
        isSignIn: true

    })