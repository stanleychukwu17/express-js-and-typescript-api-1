import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UsersSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    name: {type:String, required:true},
    password: {type:String, required:true}
}, {timestamps: true})

const Users = mongoose.model('Users', UsersSchema)
module.exports = Users