const express = require("express")

const { AccountModel } = require("../Model/accountmodel")

const accountRoute = express.Router()


accountRoute.get("/", async (req, res) => {
    try {
        let post = await AccountModel.find()
        res.send({ post })
    } catch (err) {
        res.send({ "err": "Something went wrong" })
    }
})

accountRoute.post("/add", async (req, res) => {
    let data = req.body
    try {
        let amnt = new AccountModel(data)
        await amnt.save()
        res.send({ msg: "data added", amnt })

    } catch (er) {
        console.log("er", er)
    }
})
accountRoute.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const user = await AccountModel.findById(id)
        res.send({ user })
    }
    catch (er) {
        console.log(er)
    }

})
accountRoute.patch("/withdraw/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const amount = await AccountModel.findOne({ _id: id })
    const Account_id = amount.User_Id
    const Acess_id = payload.User_Id
    //console.log(typeof payload.Balance)
    try {
        if (Account_id !== Acess_id) {
            res.send("you are not Authorised")
        } else {
            if (amount.Balance >= payload.Balance && amount.Balance > 0) {
                const updateAmnt = amount.Balance - Number(payload.Balance)
                //console.log("updateAmnt", updateAmnt)
                await AccountModel.findByIdAndUpdate(id, { Balance: updateAmnt })
                res.send({ msg: "update", amount })
            } else {
                res.send("insufficient balance")
            }

        }

    } catch (err) {
        console.log(err)
        res.send("Something went wrong")
    }
})

accountRoute.patch("/deposite/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const amount = await AccountModel.findOne({ _id: id })
    const Account_id = amount.User_Id
    const Acess_id = payload.User_Id

    // console.log(typeof payload.Balance)
    try {
        if (Account_id !== Acess_id) {
            res.send("you are not Authorised")
        } else {

            const updateAmnt = amount.Balance + Number(payload.Balance)
            // console.log("updateAmnt", updateAmnt)
            await AccountModel.findByIdAndUpdate(id, { Balance: updateAmnt })
            res.send("update")


        }

    } catch (err) {
        console.log(err)
        res.send("Something went wrong")
    }
})
module.exports = {
    accountRoute
}