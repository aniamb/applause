const express = require('express')
const cors = require('cors');
const passport = require('passport')
const router = express.Router()
router.use(cors());


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { 
    failureRedirect: '/login'
    }), (req, res) => {
        console.log(req.user)
        if(req.user.handle){
            console.log("existing gmail user")
            res.redirect("http://localhost:3000/profilegoogle/" + req.user.handle)
            res.end();
        }else{
            console.log("not an existing gmail user")
            //need to send email to edit profile, set currentUser to email sessionStorage
            res.redirect("http://localhost:3000/editprofilegoogle/" + req.user._id)
        }
        
    })

module.exports = router