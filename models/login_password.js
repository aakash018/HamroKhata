const mongoose = require("mongoose")

const passwordSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: "admin"
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Password", passwordSchema)