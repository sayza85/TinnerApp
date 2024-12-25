import Elysia from "elysia"
import { AccountService } from "../services/account.service"
import { jwtConfig } from "../configs/jwt.configs"
import { AccountDto } from "../types/account.types"

export const AccountController = new Elysia({
    prefix: '/api/account',
    tags: ['Account']
})
    .use(jwtConfig)
    .use(AccountDto)

    .post('/login', async ({ set, body, jwt }) => {
        try {
            const user = await AccountService.login(body)
            const token = await jwt.sign({ id: user.id })
            return { user, token }
        } catch (error) {
            set.status = 400
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('Something went wrong, try agian later')
        }
    }, {
        detail: { summary: "login" },
        body: "login",
        response: "user_and_token"

    }
        ,)

    .post('/register', async ({ body, jwt, set }) => {
        try {
            const user = await AccountService.craeteNewUser(body)
            const token = await jwt.sign({ id: user.id })
            return { token, user }
        } catch (error) {
            set.status = 400
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('Something went wrong, try agian later')
        }
    }, {
        body: "register",
        response: "user_and_token",
        detail: { summary: "Create new user" },

        beforeHandle: function ({ body: { username, password }, set }) {
            const usernameRegex = /^[A-Za-z][A-Za-z\d]{3,9}$/
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
            if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
                set.status = "Bad Request"
                throw new Error(`Invalid username or password`)
            }
        },
    })


