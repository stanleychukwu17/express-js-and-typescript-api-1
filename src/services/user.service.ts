import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import Users, {UserDocument} from "../model/user.model";
import log from "../logger";


export async function registerNewUserService (details: DocumentDefinition<UserDocument>) {
    try {
        return await Users.create(details);
    } catch (err: any) {
        log.error(err.message);
        throw new Error(err.message);
    }
}

// for creating a session to log the user in
export async function loginUserService (details: DocumentDefinition<UserDocument>) {
    // validate the email and password

    // create a session

    // create an access token

    // create a refresh token

    // send back refresh token and access token
}