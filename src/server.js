require('./db/connection')

const express = require("express")
const userRouter = require('./user/userRouter')

const app = express()

const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 5001

app.use(express.json())

app.use(userRouter)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})