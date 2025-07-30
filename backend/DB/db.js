const mongoose = require('mongoose');

function conneectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("connect to db")
    })
}

module.exports = conneectToDB;