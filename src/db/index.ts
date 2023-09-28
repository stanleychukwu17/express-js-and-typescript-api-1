import mongoose from "mongoose";
import config from "config"
import log from '../logger/'

async function connect () {
    const dbUri = config.get('dbUri') as string

    return mongoose
        .connect(dbUri)
        .then(re => {
            log.info('Database connection is okay')
            console.log('connection established')
        })
        .catch(err => {
            console.log('cannot connect to database')
            log.error(err.message)
            process.exit(1)
        })
}

export default connect