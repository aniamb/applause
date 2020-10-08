
const crypto = require('crypto')
const express = require('express');
require('dotenv').config();
const { REACT_APP_EMAIL, REACT_APP_PASSWORD } = process.env;

const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const dbConnectionString = "mongodb+srv://applause:applause@cluster0.schfs.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');

let User = require('./models/user');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//createaccount
app.post('/createaccount', function(req, res) {
   //password hash
   bcrypt.hash(req.body.password, 10, function(err, hash){
      User.findOne({$or: [
         {'email' : req.body.email}]}).exec(function (err, user){
            if(user){
            //user with email/handle exists
            console.log('email already in use');
            res.status(400).send({
               message: 'Email In Use'
            });
            res.end();
         }else{
            //user unique ->add to db
            User.create({
            firstname : req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            bio: "bio check",
            })
           res.status(200).send(req.body.email);
           res.end();
        }
      });
   });
 });

 //login
 app.post('/login', function(req, res, err) {
   User.findOne({
      'email': req.body.email }, function(err, user) {
      if (user) {
          //email exists
          if(bcrypt.compareSync(req.body.password, user.password)) {
              // Passwords match
               res.status(200).send(user.handle);
              res.end();
          } else {
              // Passwords don't match
              console.log('password mismatch');
              res.status(400).send({
               message: 'Password Does Not Match Existing User'
            });
              res.end();
          }
      } else {
          // user does not exist
          console.log('user not in base');
          res.status(400).send({
            message: 'There is No Account With This Email'
         });
         res.end();
      }
  })
 });

 //send reset password email
 app.post('/resetpassword', function(req, res, err) {
   User.findOne({
      'email': req.body.email }, function(err, user) {
      if (user) {
          //email exists
            const token = crypto.randomBytes(20).toString('hex');
            //updating token
            User.findOneAndUpdate(
               {"email" : req.body.email},
               {$set: {"resetPasswordToken": token, "resetPasswordExpires": Date.now() + 3600000} },
               function(err, items){
                   if(err){
                       res.status(400).send('Error happened finding user for token update')
                   }else{
                       console.log("token updated");
                       res.status(200).send('bio updated');
                   }
                   res.end();
               }
            );
            const transporter = nodemailer.createTransport({
               service: "gmail",
               auth: {
                  user: `${REACT_APP_EMAIL}`,
                  pass: `${REACT_APP_PASSWORD}`
               }
            })
            const mailOptions = {
               from: `${REACT_APP_EMAIL}`,
               to: `${req.body.email}`,
               subject: 'Link to Reset Password for your Applause account',
               text: 
                  'You are receiving this because you (or someone else) have requested the reset of the password for you Applause account. \n\n'
                  + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n'
                  + `http://localhost:3000/reset/${token}\n\n`
                  + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            console.log('sending mail');
            transporter.sendMail(mailOptions, (err, response) => {
               if(err) {
                  console.log('there was an error: ', err);
               } else {
                  console.log('recovery email sent')
                  res.status(200).send('recovery email sent');
                  res.end();
               }
            })
      } else {
          // user does not exist
          console.log('user not in base');
          res.status(400).send({
            message: 'There is No Account With This Email'});
         res.end();
      }
  })
 });

 //verify reset password link
 app.get('/reset', (req, res, next) => {
    console.log(req.query.resetPasswordToken);
   User.findOne({
         resetPasswordToken: req.query.resetPasswordToken,
         resetPasswordExpires: {
            $gt: Date.now()
         }
      
   }).then(user => {
      if(user == null){
         console.log('password reset link is invalid or has expired');
         res.json('password reset link is invalid or has expired');
      }else{
         console.log("found user!!!!")
         res.status(200).send({
            email: user.email,
            message: 'password reset link a-ok',
         })
      }
   })
 })

 app.put('/updatePasswordViaEmail', (req, res, next) => {
   User.findOne({
         email: req.body.email,
   }).then(user => {
      if(user){
         console.log('user exists in db to update password');
         bcrypt.hash(req.body.password, 10, function(err, hash){
            User.findOneAndUpdate(
               {"email" : req.body.email},
               {$set: {"password": hash}},
               function(err, items){
                   if(err){
                       res.status(400).send('Error happened updating password')
                   }else{
                       console.log("password updated");
                       res.status(200).send('password updated');
                   }
                   res.end();
               }
            );
         });
      }else{
         console.log('no user exists in db to update');
         res.status(404).json('no user exists in db to update');
      }
   })





 })


//LOADING INFO INTO USER PROFILE CODE
app.get('/profile', function(req, res, err) {
    User.findOne({$or: [
        {'email' : req.query.email}]}).exec(function (err, user){
           console.log(user);
           res.status(200).json(user);
     });
});

//Updating user profile fields
app.post('/editprofile', function(req, res, err) {
    console.log(req.body);
    User.findOneAndUpdate(
        {"email":req.body.currUserEmail},
        {$set: {handle:req.body.handle, firstname: req.body.firstname, lastname:req.body.lastname, bio:req.body.bio}},
        {new:true},
        function(err,items){
            if(err){
                res.status(400).send('Error occured when editing profile.')
            }else{
                console.log("Successfully updated profile.");
                res.status(200).send('Profile update.d');
            }
            res.end();
        }
    )
});
