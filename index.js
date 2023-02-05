require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.MONGO_DB
mongoose.set("strictQuery", false);
mongoose.connect(mongoString);
const bodyParser = require("body-parser");
const auth = require("middleware/auth");
const User = require('model/user');
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const Blog = require('model/blog');

const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
// mango db compase string url = mongodb+srv://himanshi:<password>@cluster0.rogp7ub.mongodb.net/test
const routes = require('./routes/routes');
const app = express();
app.use(bodyParser.urlencoded(
    { extended:true }
))

app.set("view engine","ejs");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

app.use(express.json());
app.post("/create_user",auth,upload.single('myimage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    var data = new User({
        name : req.post.name,
        email : req.post.email,
        password : req.post.password.toString('base64'),
        image : final_img
    }

    )
    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

app.post('/create_blog',auth, (req, res) => {
    const data = new Blog({
        title: req.post.title,
        createBy: req.post.createBy,
        description : req.post.description,
        content : req.post.content,
        isprivate: req.post.isprivate,
        createat: Date.now()

    })
    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// app.use('/api', routes)
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})