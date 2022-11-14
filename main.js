const express = require('express');
const app = express();
const mongoose = require('mongoose');
const modal = require('./model');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//routes
const loginRoute = require('./routes/login');
const signUP = require('./routes/signUp');
const updateUser = require('./routes/update');
const isActivate = require('./routes/isActive');
// you can change it to the your db
let mongoDB = 'mongodb+srv://admin:admin@cluster0.tq8sr.mongodb.net/test-coruscate';

const auth = require("./auth");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(auth);
const fs = require('fs');

let dbo;
mongoose.connect(mongoDB, async function (error,db) {
    dbo = db;
    });

app.use('/login',loginRoute);
app.use('/register',signUP);
app.use('/update',updateUser);
app.use('/activate',isActivate);


//for exporting User Data
app.get('/export', async (req,res)=>{
    dbo.collection("users").find().toArray(function (err, result) {
        if (err) { res.send(err) };
        let data = JSON.stringify(result);
        fs.writeFile('./users.json', data, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        res.send(data);
    });
});
    app.listen('3000');