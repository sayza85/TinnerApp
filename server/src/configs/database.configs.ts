import { connect } from "bun"
import mongoose from "mongoose"

const password = Bun.env.MONGO_DB_PASSWORD || ""
const username = Bun.env.MONGO_DB_USERNAME || "your_username"
const db_name = Bun.env.MONGO_DBNAME || "tinner_app"

const uri = `mongodb+srv://${username}:${password}@cluster0.ejmdz.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        try {

            await mongoose.connect(uri)
            console.log('----- MongoDB Conneted------')
        } catch (error) {
            console.error('f----- MongoDB Conneted error------')
            console.error(error)
        }
    }
}