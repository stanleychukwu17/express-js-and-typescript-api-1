import {Express, Request, Response, NextFunction} from 'express';

export default function routes (app: Express) {
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    app.post('/api/new-user', () => {

    })
}