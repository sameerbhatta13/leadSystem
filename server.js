const express = require('express')
const path = require('path')
require('dotenv').config()
require('./DB/connection')
const expressLayout = require('express-ejs-layouts')


const app = express()
let port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//template engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

//import routes
const startFollowSchedule = require('./middleware/emailSchedular')
const userRoute = require('./src/auth/auth.routes')
const { notFound, erroMiddleware } = require('./middleware/errorMiddleware')

const homepage = require('./server/routes/main')


//implement routes
app.use('/api', userRoute)
app.use('/', homepage)
//middleware
app.use(notFound)
app.use(erroMiddleware)



//send follow up emails
startFollowSchedule()


app.listen(port, () => {
    console.log(`server is connected at ${port}`)
})
