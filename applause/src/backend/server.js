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
let Review = require('./models/review');
var ObjectId = require('mongodb').ObjectID;
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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

var unirest = require("unirest");
const { useImperativeHandle } = require('react');
const { Server } = require('http');
//const { default: Review } = require('../frontend/components/Review');
//const { default: Review } = require('../frontend/components/Review');

var api = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/search");
//var albumAPI = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/album/%7Bid%7D");

var searchTerm;

api.headers({
	"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
	"x-rapidapi-key": "0eb2fb4595mshdb8688a763ce4f8p1f0186jsn77d3735b4c36",
	"useQueryString": true
});



//searches API for artist/album
app.post('/searchserver', function (req,res1) {
	console.log(req.body);
	searchTerm = (req.body.value);
	console.log(searchTerm);

	var albumTitles = [];
	var objectsTest = [];
	var finalVals = [];
	var finalObjects = [];
	var userList = [];



	function Content(id, title, artist, art, artistImage) { 
      this.id = id;
		this.title = title; 
		this.artist = artist; 
      this.art = art;
      this.artistImage = artistImage;
	 }

	 if (searchTerm.charAt(0) ==='@') {
		searchTerm = searchTerm.substring(1);
		User.find({"handle": { "$regex": searchTerm, "$options": "i" } }, function(err, users){
			if (err) throw err;
			console.log(users);
	  
			for (var i = 0; i < users.length; i++) {
			  console.log(typeof(users[i].handle));
			  userList.push(users[i].handle);
			}
			 console.log(userList);
			 res1.status(200).json({result: userList});
			 res1.end();
		  });
		  
	}else {
		api.query({
			"q": searchTerm
		});
		
		api.end(function (res) {
			if (res.error) throw new Error(res.error);
			var i;
			var k = 'value';

			for (i = 0; i < res.body.data.length; i++) {
            
				var val1 = new Content(res.body.data[i].album.id, res.body.data[i].album.title, res.body.data[i].artist.name, res.body.data[i].album.cover_medium, res.body.data[i].artist.picture_medium); 

            objectsTest.push(val1);
				albumTitles.push(res.body.data[i].album.title);
			}
			var noDups = new Set(albumTitles);
			var noDupObj = new Set(objectsTest);
			finalVals = Array.from(noDups);
			finalObjects = Array.from(noDupObj);
         console.log(finalObjects);
         
			res1.status(200).json({result: finalObjects})
			res1.end();
		});
	}
});

//createreview
app.post('/createreview', function(req, res) {
   var reviewArray;
   if(req.body.private === true){
      reviewArray = "private_reviews"
   }else{
      reviewArray = "public_reviews"
   }
   //var review = new Review(req.body);
   var albumId = req.body.albumId;
   console.log(albumId);
   var releaseDate;
   
   var getAlbumInfo = unirest("GET", "https://rapidapi.p.rapidapi.com/album/" + albumId);

   getAlbumInfo.headers({
      "x-rapidapi-key": "0eb2fb4595mshdb8688a763ce4f8p1f0186jsn77d3735b4c36",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "useQueryString": true
   });

   getAlbumInfo.end(function (yes) {
      if (yes.error) throw new Error(yes.error);
      console.log("API RESPONSE");
     // releaseDate = res.body.release_date;

     const review = new Review ({
      album: req.body.album,
      artist: req.body.artist,
      rating: req.body.rating,
      username: req.body.username,
      content: req.body.content,
      private: req.body.private,
      time: req.body.time,
      albumId: req.body.albumId,
      image: req.body.image,
      releaseDa: this.releaseDate
    })
 
    review.save(function (err) {
       if (err) {
         console.log("ERRR");
         console.log(err);
       }
       //creates Review and adds Review ObjectID to respective User
       User.findOneAndUpdate(
             {handle: req.body.username},
            {"$push":{[reviewArray]:review._id}},
             {upsert:true, select:'review'}
       ).populate('review').exec(function(err, data) {
                 console.log(data);
         });
       });
    res.status(200).send("Created new review!");
    res.end();

   });
});

app.get('/editreview', function(req, res) {
   Review.find({'_id': ObjectId(req.query.id) }, function(err, review) {
      if (review) {
         res.status(200).send(review);
         res.end();
      } else {
         res.status(400).send('no reviews for this id');
         res.end();
      }
   })
   
});

app.post('/submitedit', function(req, res, err) {
   // Reviews.update({_id: req.body.id}, {$set:req.body.reviewInfo});
   console.log("entered");
   console.log(req.body.reviewInfo);
   // Review.findOneAndUpdate(
   //    {"_id" : ObjectId(req.query.id) },
   //    {$set: req.body.reviewInfo},
   //    function(err, items){
   //        if(err){
   //           console.log("error while updating review")
   //           // res.status(400).send('Error happened updating review')
   //        }else{
   //            console.log("review updated");
   //        }
   //        res.end();
   //    }
   // );

   Review.findOneAndUpdate(
      {"_id":req.body.id},
      {$set: (req.body.reviewInfo)},
      {new:true},
      function(err,items){
          if(err){
              return res.status(400).send('Error occured when editing profile.')
          }else{
              console.log("Successfully updated profile.");
              return res.status(200).send('Profile update.d');
          }
          //res.end();
      }
  )
   //res.end();
})

//deletereview [WIP]
app.post('/deletereview', function(req, res, err) {
   console.log(req.body.params.id);
   Review.findByIdAndRemove(req.body.params.id.toString().trim(), function (err) {
      if(err) console.log(err);
      console.log("Successful deletion");
    });
    res.status(200).send("Deleted review");
    res.end();
})

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
            bio: "Write something fun about yourself!",
            meta_data: "avatar.png",
            visibility: "public"
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
              message: 'Password Does Not Match Existing User'});
              res.end();
            }
         }else{
            res.status(400).send({
               message: 'No Existing Account With That Email'
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
          console.log("Followers:\t" + userfollowers);
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

  //get reviews associated with an artist
app.get('/getartistreviews', function(req, res, err) {
   console.log(req.query.artistName)
   Review.find({'artist': req.query.artistName, 'private': false }, function(err, review) {
      if (review) {
         console.log(review);
         res.status(200).json({results: review})
         res.end();
      }else {
         res.status(400).send('No Reviews Found');
         res.end();
      }
   })
});

  //get reviews associated with an album
  app.get('/getalbumreviews', function(req, res, err) {
   console.log(req.query.albumName)
   Review.find({'album': req.query.albumName, 'private': false }, function(err, review) {
      console.log('yooooo');
      if (review) {
         console.log(review);
         res.status(200).json({results: review})
         res.end();
      }else {
         res.status(400).send('No Reviews Found');
         res.end();
      }
   })
});


 app.get('/profile', function(req, res){
   console.log(req.query.userHandle);
   User.findOne({'handle': req.query.userHandle }, function(err, user) {
        if (user) {

         res.status(200).send(user);
         res.end();

       } else {
         // user does not exist
         console.log('user not in base');
         res.status(400).send('Email or Password does not exist');
         res.end();
       }
    })
 });

 app.get('/viewprofile', function(req, res){
   var isFollowing = false;
   var isPrivate = false;
   var userToSend;
   //determine if current logged in user is following
   User.findOne({'handle': req.query.currentUser }, function(err, user) {
      if (user) {
         for (var i = 0; i < user.following.length; i++) {
            if (user.following[i] === req.query.userHandle) {
                isFollowing = true;
                break;
            }
          }
          //determine the visibility of the profile
          User.findOne({'handle': req.query.userHandle }, function(err, user) {
            if (user) {
               if(user.visibility === "public"){
                  isPrivate = false;
               } else {
                  isPrivate = true;
               }
               userToSend = user;
               console.log(req.query.userHandle + " isPrivate: "+ isPrivate)
              //send back userinfo and reviews
               var reviewsToSend = []
               Review.find({'username': req.query.userHandle }, function(err, reviews) {
                  if (reviews) {
                     if(isFollowing === true){
                        //send all public + private reviews
                        console.log("in review isFollowing True")
                        for (var i = 0; i < reviews.length; i++) {
                           reviewsToSend.push(reviews[i])
                        }
                        
                     } else {
                        if(isPrivate === true){
                           console.log("not following but is private profile");
                        } else {
                           //send only public reviews bc not following BUT public profile
                           console.log("not following but is public profile");
                            for (var i = 0; i < reviews.length; i++) {
                              if (reviews[i].private === false) {
                                 console.log("pushing public review")
                                 reviewsToSend.push(reviews[i]);
                              }
                            }
                        }
                     }
                     return res.status(200).send({user: userToSend, reviews: reviewsToSend});
                  } else {
                     console.log('no reviews for this user');
                     return res.status(400).send('no reviews for this user');
                  }
               })
            } else {
               // user does not exist
               console.log('user not in base');
            }
         })
     } else {
       // user does not exist
       console.log('user not in base');
     }
  })
  
 });

 app.get('/reviews', function(req, res){
   console.log(req.query.userHandle);
   console.log("GETTING REVIEWS");
   Review.find({'username': req.query.userHandle }, function(err, reviews) {
      if (reviews) {
         return res.status(200).send(reviews);
         //res.end();
      } else {
         console.log('no reviews for this user');
         return res.status(400).send('no reviews for this user');
        // res.end();
      }
   })

 });

 app.get('/unfollow', function(req, res){

  let unfollowUser = null
  User.findOne({'handle': req.query.unfollowUsername }, function(err, newUser) {
      unfollowUser = newUser;
      if (unfollowUser) {
        console.log("Found\t" + req.query.unfollowUsername)
      }
  })

  let mainUser = null
  User.findOne({'handle': req.query.userHandle }, function(err, newUser) {
      mainUser = newUser;
      if (mainUser) {
        console.log("Found\t" + req.query.userHandle)
      }
  })

   User.updateOne(
    {"handle" : req.query.userHandle},
    {$pull : {following : req.query.unfollowUsername}},
    function (err,result){
      if(err){
          console.log("Failed to unfollow genericUser");
          res.status(400).send("Error in unfollowing user");
          res.end();
      }else{
        console.log("No errors found in unfollowng!")
          User.updateOne(
              {"handle" : unfollowUser.handle},
              {$pull : {followers : req.query.userHandle}},
              function(err, results){
                  if(err){
                      console.log("Failed to update genericUser's followers list when unfolowing");
                      res.status(400).send("Error occurred when following user. User may not exist");
                      res.end();
                  }
                  res.status(200).send(mainUser.following);
                  console.log(mainUser.following)
                  res.end();
              }
          )
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


// LOADING INFO INTO USER PROFILE CODE
app.get('/profile', function(req, res, err) {
    console.log(req.body);
    User.findOne({$or: [
        {'handle' : req.query.handle}]}).exec(function (err, user){
           console.log(user);
           res.status(200).json(user);
     });
});

//LOADING INFO INTO EDIT PROFILE CODE FROM CREATE ACCOUNT
app.get('/fillProfile', function(req, res, err) {
    console.log(req.body);
    User.findOne({$or: [
        {'email' : req.query.email}]}).exec(function (err, user){
           console.log(user);
           res.status(200).json(user);
     });
});

const path = require("path");
console.log(path);
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../public/")));
// app.use(express.static("../public"));

const multer = require("multer");

const storage = multer.diskStorage({
   destination: function(req, file, cb){
      cb(null, "../public/");
   },
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now().toString() + "-" + file.originalname);
   }
 });

 const fileFilter = (req, file, cb) => {
   if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      cb(null, true);
   } else {
      cb(null, false);
   }
 }

 const upload = multer({
   storage: storage,
   limits:{fileSize: 1024*1024*1024},
   fileFilter: fileFilter
 })


app.post('/uploadpicture', upload.single("file"), function(req, res, err) {    
   console.log(req.file);
   if (req.file === null || req.file === undefined) {
      res.status(200).send("../public/avatar.png")
   } else {
      res.status(200).send(req.file.path.toString());
   }
   console.log(req.file.path);
});

//Updating user profile fields
app.post('/editprofile', function(req, res, err) {
   User.findOne({$or: [
      {'handle': req.body.handle}]}).exec(function (err, user){
          if(user && user.email!=req.body.currUserEmail){
              console.log('Handle already in use');
              res.status(400).send({
                 message: 'Handle In Use'
              });
              res.end();
          } else {
              User.findOneAndUpdate(
                  {"email":req.body.currUserEmail},
                  {$set: {handle:req.body.handle, firstname: req.body.firstname, lastname:req.body.lastname, bio:req.body.bio, meta_data:req.body.meta_data, visibility:req.body.visibility}},
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
          }
      })
});

// Delete Account
app.post('/delete', function(req, res, err) {
    console.log(req.body.currUser);
    User.deleteOne({'handle': req.body.currUser}).exec(function(err){
        console.log("Account successfully deleted.")
        res.status(200).send('Deleting account worked');
    })
})
