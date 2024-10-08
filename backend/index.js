const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");



const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);  // as frontend and backend is running in different port so have to use cors

app.use(express.json());  // data to be converted into JSON
app.use(cookieParser());  // for cookie parsing


app.use("/api", router);


const PORT = 8080 || process.env.PORT;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
