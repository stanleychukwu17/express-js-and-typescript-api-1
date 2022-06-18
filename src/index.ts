import express from "express";
const app = express();

app.listen(4000, () => {
    console.log('now listening to request from port 4000')
})