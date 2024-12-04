import Elysia from "elysia"

export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ["Photo"]
})
    .post('/', async ({ body: { imgFile } }) => {
        const filename = `${Date.now()}-${imgFile.name}`
        const filePhat = `pubic/uploads/${filename}`
        const buffer = await imgFile.orrayBuffer()


    }, {
        detail: { summary: "Up" },

    })