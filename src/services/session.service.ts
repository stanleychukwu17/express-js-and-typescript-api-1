import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import jwt from "jsonwebtoken";

import Session, {SessionDocument} from '../model/session.model'
import {UserDocument} from "../model/user.model"
import { sign, decode } from "../utils/jwt.utils";



// creates a new session for a user and save the session in the database
type createProps = {
    userId: string,
    userAgent: string
}
export async function createSession({userId, userAgent}: createProps) {
    const session = await Session.create({user:userId, userAgent})
    return session.toJSON()
}


// creates an access token
interface accessProps {
    user: | Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>
    session: | Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>
}
export async function createAccessToken({user, session}: accessProps) {
    // Build and returns the new access token
    const accessToken = await sign(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
  
    return accessToken;
}


// creates a refresh token
interface refreshProps {
    session: Object;
    options: jwt.SignOptions
}
export async function createRefreshToken({session, options}: refreshProps) {
    const refreshToken = await sign(session, options );
    return refreshToken
}
  