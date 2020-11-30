const express = require('express')
const cors = require('cors');
const passport = require('passport')
const router = express.Router()
router.use(cors());


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { 
    failureRedirect: '/login'
    }), (req, res) => {
        if(req.user.handle){
            console.log("existing user")
            res.redirect('http://localhost:3000/editprofile')
        }else{
            console.log("not an existing user")
            res.redirect('http://localhost:3000/editprofile')
        }
        
    })

module.exports = router