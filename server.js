const express = require('express')
require('dotenv').config()
require('./DB/connection')

const app = express()
let port = process.env.PORT

//import routes
const userRoute = require('./src/auth/auth.routes')
const { notFound, erroMiddleware } = require('./middleware/errorMiddleware')

app.use(express.json())
//implement routes
app.use('/api', userRoute)
//middleware
app.use(notFound)
app.use(erroMiddleware)

app.listen(port, () => {
    console.log(`server is connected at ${port}`)
})
