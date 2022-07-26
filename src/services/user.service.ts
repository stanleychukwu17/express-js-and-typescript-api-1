import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import Users, {userDocument} from "../model/user.model";
import log from "../logger";


export async function registerNewUserService (details: DocumentDefinition<userDocument>) {
    try {
        return await Users.create(details);
    } catch (err: any) {
        log.error(err.message);
        throw new Error(err.message);
    }
}

// for creating a session to log the user in
export async function loginUserService (details: DocumentDefinition<userDocument>) {
    
}