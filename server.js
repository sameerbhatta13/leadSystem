require("dotenv").config();
require("./DB/connection");
const cors = require('cors')
const express = require("express");

const userRoute = require("./src/auth/auth.routes");
const startFollowSchedule = require("./middleware/emailSchedular");
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

//middleware
app.use(notFound);
app.use(erroMiddleware);

//send follow up emails
startFollowSchedule();

app.listen(port, () => {
  console.log(`server is connected at ${port}`);
});
