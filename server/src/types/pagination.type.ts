import { Static, t, TSchema } from "elysia"

export const _pagination = t.Object({
    pageSize: t.Number(),
    currentPage: t.Number(),
    length: t.Optional(t.Number()),
})

export type pagination = Static<typeof _pagination>

export function CreatePagination<T extends TSchema, U extends TSchema>(itemtype: T, pagination: U) {
    return t.Object({
        items: t.Array(itemtype),
        pagination: pagination
    })
}