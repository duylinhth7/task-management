const mongoose = require('mongoose');
const genarate = require("../../../helpers/genarate")

const userSchema = new mongoose.Schema({

    fullName: String,
    email: String,
    password: String,
    status: {
        type: String,
        default: "active"
    },
    token: {
        type: String,
        default: genarate.genarateToken(20)
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,

}, { timestamps: true });

const User = mongoose.model("User", userSchema, "user");

module.exports = User;