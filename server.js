require("dotenv").config();
require("./DB/connection");
const cors = require('cors')
const express = require("express");

const userRoute = require("./src/auth/auth.routes");
const adminRoute = require('./src/admin/admin.route')
const serviceRoute = require('./src/services/services.route')
const { scheduleEmail, scheduleEmailForClient } = require("./middleware/emailSchedular");
const { notFound, erroMiddleware } = require("./middleware/errorMiddleware");


const app = express();
let port = process.env.PORT;

//cors middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://0.0.0.0:5173', 'http://192.168.18.102:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true

}))

app.use(express.json());

//implement routes
app.use("/api", userRoute);
app.use('/api', adminRoute)
app.use('/api', serviceRoute)

//middleware
app.use(notFound);
app.use(erroMiddleware);

//send follow up emails
scheduleEmail();
scheduleEmailForClient()


app.listen(port, "192.168.18.102", () => {
  console.log(`server is connected at http://192.168.18.102:${port}`);
});
