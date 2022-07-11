import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// creates the typeScript interface for the UsersDocument
export interface UsersDocument extends mongoose.Document {
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

// creates the users_schema
const UsersSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    name: {type:String, required:true},
    password: {type:String, required:true}
}, {timestamps: true})

// hashes the password before it is saved to the database
UsersSchema.pre("save", async function (next) {
    let user = this as UsersDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    // Replace the password with the hash
    user.password = hash;

    return next();
});

// used to compare the user's password when a user wants to login
UsersSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UsersDocument

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const Users = mongoose.model<UsersDocument>('Users', UsersSchema)
export default Users