require("dotenv").config();
const express = require("express");
const app = express();

const userRoute = require("./src/auth/auth.route");
const { notFound, erroMiddleware } = require("./middleware/errorMiddleware");

require("./DB/connection");
let port = process.env.PORT || 5000;

app.use(express.json());

//implement routes
app.use("/api", userRoute);

//error middleware
app.use(notFound);
app.use(erroMiddleware);

app.listen(port, () => {
  console.log(`server is connected at ${port}`);
});
