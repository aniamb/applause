const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors())
let User = require('./models/user');
require('dotenv').config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
console.log(GOOGLE_CLIENT_ID)

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        var fullName = profile.displayName.split(' ')
        var firstName = fullName[0]
        var lastName = fullName[fullName.length - 1];
        console.log(profile.emails[0].value)
        const newUser = {
            firstname : firstName,
            lastname: lastName,
            email: profile.emails[0].value,
            bio: "Write something fun about yourself!",
            meta_data: "avatar.png",
            visibility: "public"
        }
        
        try {
            let user = await User.findOne({email: profile.emails[0].value})
            if(user){
                console.log("found existing gmail")
                done(null, user)
            }else{
                user = await User.create(newUser)
                console.log("new gmail created")
                done(null, user)
            }
        } catch (error) {
            console.log(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => done(err, user))});
}