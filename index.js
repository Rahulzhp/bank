const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { usersRoute } = require("./Routes/userroute")
const { accountRoute } = require("./Routes/accountroute")
const { authenticate } = require("./Middleware/auth")


const app = express()

app.use(express.json())
app.use(cors())
require('dotenv').config()

app.get("/", (req, res) => {
    res.send("welcome to home page")
})

app.use("/users", usersRoute)
// app.use(authenticate)
app.use("/account", accountRoute)

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("connected to db")

    } catch (er) {
        console.log(er)
    }
    console.log(`server is running in port ${process.env.port}`)
})