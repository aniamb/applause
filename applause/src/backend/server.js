const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
//const MongoClient = require('mongodb').MongoClient;
const dbConnectionString = "mongodb+srv://applause:applause@cluster0.schfs.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

let User = require('./models/user');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
const bcrypt = require('bcryptjs');

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

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
            handle: req.body.handle
            })
           res.status(200).send(req.body.email);
           res.end();
        }
      });
   });
 });

 app.post('/login', function(req, res) {
   console.log('email requested:' + req.body.email);
   User.findOne({'email': req.body.email }, function(err, user) {
      if (user) {
          //email exists

          bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
              console.log("Password doesn't match!");
              res.status(400).send({
              message: 'Password Does Not Match Existing User'});
              res.end();
            } else {
               console.log("Password matches!");
               console.log('user found successfully');
               res.status(200).send(user);
               res.end();
            }
          })
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

 app.post('/resetpassword', function(req, res, err) {
   User.findOne({
      'email': req.body.email }, function(err, user) {
      if (user) {
          //email exists
            console.log('user found successfully');
            res.status(200).send(user.email);
            res.end();
      } else {
          // user does not exist
          console.log('user not in base');
          res.status(400).send({
            message: 'There is No Account With This Email'});
         res.end();
      }
  })
 });

 app.get('/followers', function(req, res){
    console.log("Followers in Server:\t" + req.query.userHandle);
    var userfollowers = [];
    User.findOne({
      'handle': req.query.userHandle}, function(err, user) {
        if (user) {
          // user exists
          console.log("Length of followers:\t" + user.followers.length);
          for (var i = 0; i < user.followers.length; i++) {
            if (!userfollowers.includes(user.followers[i])) {
                userfollowers.push(user.followers[i]);
            }
          }
          console.log(userfollowers);
          res.status(200).json({results: userfollowers});
          res.end();

        } else {
          // user does not exist
          console.log('error getting followers');
          res.status(400).send('error getting followers');
          res.end();
        }
     })
  });

  app.get('/following', function(req, res){
    console.log("Following in Server:\t" + req.query.userHandle);
    var userfollowing = [];
    User.findOne({
      'handle': req.query.userHandle}, function(err, user) {
        if (user) {
          // user exists
          console.log("Length of following:\t" + user.following.length);
          for (var i = 0; i < user.following.length; i++) {
            if (!userfollowing.includes(user.following[i])) {
                userfollowing.push(user.following[i]);
            }
          }
          console.log(userfollowing);
          res.status(200).json({results: userfollowing});
          res.end();

        } else {
          // user does not exist
          console.log('error getting following');
          res.status(400).send('error getting following');
          res.end();
        }
     })
  });


 app.get('/profile', function(req, res){
   User.findOne({'handle': req.body.handle }, function(err, user) {
        if (user) {

         var userInfo = {
           firstname: user.firstname,
           lastname: user.lastname,
           bio: user.bio,
         }
         res.status(200).send(userInfo);

         res.end();


       } else {
         // user does not exist
         console.log('user not in base');
         res.status(400).send('Email or Password does not exist');
         res.end();
       }
    })
 });


