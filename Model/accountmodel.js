const mongoose = require("mongoose");

const AccountShema = mongoose.Schema({
    User_Id: String,
    Balance: Number

})

const AccountModel = mongoose.model("account", AccountShema)

module.exports = {
    AccountModel
}