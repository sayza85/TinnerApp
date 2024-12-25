import Elysia from "elysia"
import { AuthMiddleWare, AuthPayload } from '../middleware/auth.middlewar'
import { UserDto } from "../types/user.type"
import { LikeService } from "../services/like.services"

export const LikeController = new Elysia({
    prefix: "api/Like",
    tags: ["Like"]
})
    .use(AuthMiddleWare)
    .use(UserDto)

    .put('/', async ({ body: { target_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await LikeService.toggleLike(user_id, user_id)
            set.status = "Bad Request"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
        }
    }, {

        detail: { summary: "Target Like" },
        isSignIn: true,
        body: "target_id"
    })

    .get('/followers', async ({ Auth, query }) => {
        const user_id = (Auth.payload as AuthPayload).id
        const user_pagination = await LikeService.getFolllwers(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get Followers" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })
    .get('/following', async ({ Auth, query }) => {
        const user_id = (Auth.payload as AuthPayload).id
        const user_pagination = await LikeService.getFollowing(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get Followers" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })