import Elysia from "elysia"
import { AuthMiddleWare, AuthPayload } from '../middleware/auth.middlewar'
import { UserDto } from "../types/user.type"
import { UserService } from "../services/user.services"




export const Usercontroller = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(AuthMiddleWare)
    .use(UserDto)
    .get('/all', () => {
        return {
            text: 'Hello World'
        }
    }, {
        isSignIn: true
    })
    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query, user_id)
    }, {
        detail: { summary: "Get user" },
        query: "pagination",
        response: "users",
        isSignIn: true,
    })
    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = 'No Content'
        } catch (error) {
            set.status = 'Bad Request'
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('Something went wrong, try agian later')
        }
    }, {
        detail: { summary: "Update Profile" },
        body: "updateProfile",
        // response: "user",
        isSignIn: true
    })