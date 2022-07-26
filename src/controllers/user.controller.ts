import {Request, Response} from 'express';
import { omit } from 'lodash';
import log from '../logger'
import { registerNewUserService } from '../services/user.service';


// here we wrap the logic of a function inside a try catch handler

// function that registers a new user
export async function registerUserHandler(req: Request, res: Response) {
    try {
        const newUser = await registerNewUserService(req.body)
        // return res.send(omit(newUser.toJSON(), 'password'))
    } catch (err: any) {
        log.error(err.message);
        return res.status(409).send(err.message); // conflict statusCode = 409 maybe conflict is email or username
    }
}