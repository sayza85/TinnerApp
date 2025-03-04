import Elysia, { t } from "elysia"
import { AuthMiddleWare, AuthPayload } from '../middleware/auth.middlewar'
import { UserDto, user } from '../types/user.type';
import { UserService } from "../services/user.services"

export const Usercontroller = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(AuthMiddleWare)
    .use(UserDto)
    .get('/:username', ({ params: { username } }) => {
        return UserService.getByUserName(username)
    }, {
        detail: { summary: "Get User By Username" },
        response: "user",
        isSignIn: true

    })
    .get('/all', () => {

        return {
            user: [
                { id: '1111', name: '1' },
                { id: '2222', name: '2' },
            ]
        }
    }, {

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