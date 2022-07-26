import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// the interface definition for the schema
export interface userDocument extends mongoose.Document {
    username: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword(userPassword: string): Promise<boolean>
}

// the user schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true})

// this method will be used to compare the received password vs the existing password
userSchema.methods.comparePassword = async function (receivedPassword: string) {
    const user = this as userDocument
    const check: boolean = await bcrypt.compare(user.password, receivedPassword)

    if (!check) { return false }
    return check
}

// hashing the password before we save to our mongodb
userSchema.pre("save", async function (next) {
    const user = this as userDocument

    // we only want to hash the password when it has not been modified or hashed
    if (!user.isModified("password")) return next();

    // use bcrypt to generate a new password
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    // update the current user password to the hashed one
    user.password = hash;

    // move on with the next function
    return next();
})

// exports the model
const Users = mongoose.model<userDocument>('Users', userSchema);
export default Users;