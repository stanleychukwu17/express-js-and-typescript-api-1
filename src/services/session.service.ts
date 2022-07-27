import { DocumentDefinition } from "mongoose";
import Session, {SessionDocument} from '../model/session.model'


// creates a new session and save the session in the database
type createProps = {
    userId: string,
    userAgent: string
}
export async function createSession({userId, userAgent}: createProps) {
    const session = await Session.create({user:userId, userAgent})
    return session.toJSON()
}