import mongoose from "mongoose"
import { user, register } from '../types/account.types'

type userWithOutID = Omit<user, 'id'>

export interface IUserDocument extends mongoose.Document, userWithOutID {
    password_hash: string
    verifyPassword: (password: string) => Promise<boolean>
    toUser: () => user //เปลี่ยนเป็น type user
}

export interface IuserModel extends mongoose.Model<IUserDocument> {
    createUser: (registerData: register) => Promise<IUserDocument>
}