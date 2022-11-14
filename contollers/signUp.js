// const jwt = require('jsonwebtoken');
const {  user } = require('../model');

var nodemailer = require('nodemailer');

//it will check if user already exist and register users
//you can send mail using your own mail
exports.signUP = async (req, res) => {
    
  user.find( { userName : req.body.userName }).exec( async (err, result) =>{
    if (err) { res.send(err) };
    // let data = [];  
 if(result.length != 0){
   res.send({
    msg : "user already exist"
   })
 }else{
  const User = new user(req.body);
  try {
     const response = await User.save();
     res.send(response);
 
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xyz@gmail.com',
    pass: 'xyz'
  }
});

let mailOptions = {
  from: 'xyz@gmail.com',
  to: req.body.email,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};    
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    } catch (err) {
      res.send();
    }
 }
});
}