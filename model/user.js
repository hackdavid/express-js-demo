const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email:{
        type : String,
        required: True
    },
    password :{
        type : String,
        required: True
    },
    image:{
        data: Buffer,
        contentType: String
    }
    
})

module.exports = mongoose.model('User', User)