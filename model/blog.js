const mongoose = require('mongoose');

const Blog = new mongoose.Schema({
    titel: {
        required: true,
        type: String
    },
    createBy: {
        required: true,
        type: String
    },
    description:{
        type : String
    },
    isprivate:{
        type: Boolean
    },
    createat:{
        type: Date
    },
    content:{
        type : Array , "default": []
    }
})

module.exports = mongoose.model('Blog', Blog)