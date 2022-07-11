import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";

// this handler handles the creating of a new user
export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e:any) {
        log.error(e);

        /**
         * the res.409 is a conflict status, it means there was a conflict during the registration and the most likely conflict would be when a user
         * is trying to register with the email of an existing user, remember that in our mongoose db UsersSchema, we made sure to set the
         * email : {type: String, unique: true}
        */
        // 
        return res.status(409).send(e.message);
    }
}