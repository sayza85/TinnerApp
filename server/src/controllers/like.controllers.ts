import Elysia from "elysia"
import { AuthMiddleWare, AuthPayload } from "../middleware/auth.middlewar"
import { UserDto } from "../types/user.type"
import { set } from "mongoose"
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
    } catch(error) {
        set.status = "Bad Request"
        if (error instanceof Error)
            throw error
    }}, {
        
        detail: { summary: "Target Like" },
        isSignIn: true,
        body: "target_id"
    })