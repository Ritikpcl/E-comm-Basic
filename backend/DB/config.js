const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(`${process.env.Data_Base}`, err => {
    if (err) {
        throw err
    } else {
        console.log("Database Successfully Connected")
    }
})