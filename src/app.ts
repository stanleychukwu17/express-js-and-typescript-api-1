import express, {Request, Response, NextFunction} from 'express';
import config from 'config'
import log from './logger'
import connect from './db/connect'

const port = config.get('port') as number;
const host = config.get('host') as string;
const dbUri = config.get('dbUri') as string;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.json('we don reach')
})

// setup the port so we can receive request to port:4000
app.listen(port, () => {
    log.info(`port listening on http://${host}:${port}`)
    connect()
})