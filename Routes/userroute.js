
const express = require("express")

const { UserModel } = require("../Model/usermodel")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")

const usersRoute = express.Router()

// userroute.use(express.json())
usersRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 8, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash })
            await user.save()
            res.send({ msg: "Registered", user })
        });
    } catch (err) {
        res.send("er", err)
        console.log(err)
    }
})

usersRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (er, result) => {
                if (er) {
                    res.send("something error")
                } else {
                    const token = jwt.sign({ userId: user[0]._id }, "masai");
                    res.send({ "sucess": "login successfully", "token": token, name: user[0].name, id: user[0]._id })
                }
            })
        }
        else {
            res.send({ msg: "wrong password" })
        }

    } catch (er) {
        res.send("something error")
    }
})

module.exports = {
    usersRoute
}