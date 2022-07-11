import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import Users, { UsersDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UsersDocument>) {
    try {
        return await Users.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findUser(query: FilterQuery<UsersDocument>) {
    return Users.findOne(query).lean();
}


type validatePasswordProps = {
    email: UsersDocument["email"]
    password: UsersDocument["password"] | string
}

export async function validatePassword({email,password}: validatePasswordProps) {
    const user = await Users.findOne({ email });

    if (!user) { return false; }

    const isValid = await user.comparePassword(password);

    if (!isValid) { return false; }

    return omit(user.toJSON(), "password");
}