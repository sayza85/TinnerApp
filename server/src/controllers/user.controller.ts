import Elysia from "elysia"

export const Usercontroller = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .get('/all', () => {
        return {
            text: 'Hello World'
        }
    }, {
        isSignIn: true
    })