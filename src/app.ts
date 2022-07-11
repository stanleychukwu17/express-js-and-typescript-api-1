import express, {Request, Response, NextFunction} from 'express';
import config from 'config'

const app = express()
app.use(express.json())



// setup the port so we can receive request to port:4000
app.listen(4000, () => {
    console.log('port listening on port 4000')
})