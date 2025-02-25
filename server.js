require("dotenv").config();
require("./DB/connection");
const cors = require('cors')
const express = require("express");

const userRoute = require("./src/auth/auth.routes");
const adminRoute = require('./src/admin/admin.route')
const { scheduleEmail, scheduleEmailForClient } = require("./middleware/emailSchedular");
const { notFound, erroMiddleware } = require("./middleware/errorMiddleware");


const app = express();
let port = process.env.PORT;

//cors middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

app.use(express.json());

//implement routes
app.use("/api", userRoute);
app.use('/api', adminRoute)

//middleware
app.use(notFound);
app.use(erroMiddleware);

//send follow up emails
scheduleEmail();
scheduleEmailForClient()


app.listen(port, () => {
  console.log(`server is connected at ${port}`);
});
