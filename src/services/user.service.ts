import { DocumentDefinition, FilterQuery } from "mongoose";
import bcrypt from "bcrypt";
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

// function below validates a username and an email
type validateProps = {
    username: UserDocument['username']
    password: string
}
export async function validateUsernameAndPassword ({username, password}: validateProps) {
    try {
        const userDts = await Users.findOne({username})

        if (userDts && userDts.email.length > 0) {
            const {password: savedPassword} = userDts
            const passMatch = await bcrypt.compare(password, savedPassword)

            if (passMatch) {
                const dUser = omit(userDts.toJSON(), 'password')
                return {'msg': 'okay', dUser}
            } else {
                return {'msg': 'bad', 'cause':'Invalid password provided'}
            }
        } else {
            return {'msg': 'bad', 'cause':'Invalid username provided'}
        }
    } catch (err: any) {
        return {'msg':'bad', 'cause':err.message};
    }
}

// for creating a session to log the user in
export async function loginUserService (details: DocumentDefinition<UserDocument>) {
    // console.log(details)
    try {
        // validate the username and password
        const validation = await validateUsernameAndPassword(details)
        if (validation.msg === 'okay') {

        }
        console.log(validation)

    } catch (err: any) {
        return {'msg':'bad', 'cause':err.message};
    }

    // create a session

    // create an access token

    // create a refresh token

    // send back refresh token and access token
}