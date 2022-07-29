import {Request} from 'express'
import { DocumentDefinition } from "mongoose";
import bcrypt from "bcrypt";
import { omit } from "lodash";
import config from "config";

import { createAccessToken, createRefreshToken, createSession } from "./session.service";
import Users, {UserDocument} from "../model/user.model";
import log from "../logger";

// registers a new user
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
        let dUser:any;

        if (userDts && userDts.email.length > 0) {
            const {password: savedPassword} = userDts
            const passMatch = await bcrypt.compare(password, savedPassword)

            if (passMatch) {
                dUser = omit(userDts.toJSON(), 'password')
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
export async function loginUserService (details: DocumentDefinition<UserDocument>, req: Request) {
    // console.log(details)
    try {
        // validate the username and password
        const validation = await validateUsernameAndPassword(details)
        if (validation.msg != 'okay') {
            return {'msg':'bad', 'cause':validation.cause};
        }

        // since the validation was successful, we now have access to the user object
        const {dUser: user} = validation

        // create a session
        const session = await createSession({userId: validation.dUser._id as string, userAgent: req.get('user-agent') || ''})

        // create an access token
        const accessToken = await createAccessToken({user, session});

        // create a refresh token
        const refreshToken = await createRefreshToken({ session, options: {expiresIn: config.get("refreshTokenTtl")} })

        // send back refresh token and access token
        console.log(user)
        console.log(session)
        console.log(accessToken)
        console.log(refreshToken)


    } catch (err: any) {
        return {'msg':'bad', 'cause':err.message};
    }




}