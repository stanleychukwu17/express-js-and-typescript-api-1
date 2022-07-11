import {Express, Request, Response} from "express";
import validate from './middleware/validate'
import {createUserHandler, createUserSessionHandler} from './controller/user.controller'
import {createUserSchema, createUserSessionSchema} from './schema/user.schema'

export default function (app: Express) {
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    // route for registering of a new user
    app.post('/api/new-user', validate(createUserSchema), createUserHandler)

    // route for the user to SignIn - 
    app.post('/api/login', validate(createUserSessionSchema), createUserSessionHandler)
}