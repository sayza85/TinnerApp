import mongoose, { get, RootFilterQuery } from "mongoose"
import { updateProfile, userPagination, user } from '../types/user.type'
import { pagination } from '../types/pagination.type'
import { IUserDocument } from "../interfaces/user.interface"
import { QueryHelper } from "../helpers/query.helpers"

export const UserService = {
    get: function (pagination: userPagination, user_id: string): Promise<userPagination> {
        throw new Error('not impement')
        let filter: RootFilterQuery<IUserDocument> = {
            _id: { $nin: new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagination)
        }
    },
    getByUserName: function (username: string): Promise<user> {
        throw new Error('not impement')
    },
    updateProfile: function (newProfile: updateProfile, user_id: string): Promise<user> {
        throw new Error('not impement')
    }
}