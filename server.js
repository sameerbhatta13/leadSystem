require("dotenv").config();
require("./DB/connection");

const express = require("express");

const userRoute = require("./src/auth/auth.routes");
const startFollowSchedule = require("./middleware/emailSchedular");
const { notFound, erroMiddleware } = require("./middleware/errorMiddleware");

const app = express();
let port = process.env.PORT;

app.use(express.json());

//implement routes
app.use("/api/v4", userRoute);

//middleware
app.use(notFound);
app.use(erroMiddleware);

//send follow up emails
startFollowSchedule();

app.listen(port, () => {
  console.log(`server is connected at ${port}`);
});
