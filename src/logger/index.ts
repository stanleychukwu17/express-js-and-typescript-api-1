import logger from 'pino'
import dayjs from 'dayjs'
import { timeStamp } from 'console'

const args = {
    pettyPrint: true,
    base: {pid: false},
    timestamp: () => `, "time":"${dayjs().format()}"`
}
const log = logger(args)
export default log