const mongoose = require("mongoose");

const crypto = new mongoose.Schema({
    data: { type: Object },
    address:{type:String, unique:true}
}, 
{ timestamps: true })


module.exports = mongoose.model('userTransactionDetail', crypto)