import { Elysia, t } from "elysia"
export const example = new Elysia()
    .get("/", () => "Hello World", {
        detail: {
            tages: ["Example"],
            sumary: "Get Example Object",
            desdription: "Hello54321"
        }
    })
    .post("/about/", ({ body }) => {
        return {
            id: "123",
            msg: "hello" + body.name
        }

    }, {
        body: t.Object({
            name: t.String()
        }),
        detail: {
            tages: ["Example"],
            sumary: "eiei",
            desdription: "Hello1234"
        }
    })

function post(arg0: string, arg1: ({ body }: { body: any }) => { id: string; msg: string }, arg2: { body: import("@sinclair/typebox").TObject<{ name: import("@sinclair/typebox").TString }> }) {
    throw new Error("Function not implemented.")
}
