const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()

const authRouter = require("./routes/auth");

const db = require("./db/connect")

const port = process.env.PORT;

app.use(express.json());

app.use("/auth/v1", authRouter)

app.listen(port, () => console.log("server is started", port));
