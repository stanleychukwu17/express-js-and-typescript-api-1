import express, {Request, Response, NextFunction} from 'express';

const app = express()
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    console.log('now on the home page')
})

// let's say we want to so many types of requests to a specific route
app.route('/')
.get((req: Request, res: Response) => {
    return res.send('You made a get request')
})
.post((req: Request, res: Response) => {
    return res.send('You made a post request')
})
.put((req: Request, res: Response) => {
    return res.send('You made a put request')
})
.all((req: Request, res: Response) => {
    return res.send('You made a request for all the different types')
})


/**
 * we can use regular expression when listening to any of the types of request, what we've been doing all this while is still regular expression
 * but of the type string, i.e /health, /pages/ipad, see more examples of different types of regular expression for requests
*/
// this request below will match, :4000/abcd, :4000/abzzcd, :4000/abRANDOMcd, :4000/ab1234cd
app.get('/ab*cd', (req, res) => res.send('/ab*cd'))

// this request below will match, :4000/abcd, :4000/j, :4000/john, will match all words with out numbers from a-z
app.get(/[a-z]/, (req, res) => res.send('matching all of my guys'))


// setup the port so we can receive request to port:4000
app.listen(4000, () => {
    console.log('port listening on port 4000')
})