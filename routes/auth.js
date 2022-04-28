const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const tokenSecret = "UFhGU8MZjF"

const middleware = require('../middlewares')

router.route('/login').post( function(req, res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) res.status(404).json({ error: 'no user with that email found' })
            else {
                res.status(200).json({ token: generateToken(user.email) })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.route('/register').post( function(req, res) {
    console.log(req);
    var user = new User();
    User.findOne({"username": req.body.username}, function(err, user_data){
        if(err){
            console.log(err)
        }
        if(user_data){
            return res.json({
                status : 400,
                message : "User already exist"
            });
        }
        
        user.username = req.body.username;
        user.password = req.body.password;
        user.confirm_password = req.body.confirm_password;
        user.email	   = req.body.email;
        
        user.save(function(err, login_data){
            if(err)
                return res.status(400).send(err);
            res.json({
                status: 200,
                message : 'You have succesfully registered.'
            });
        });
    });
});

router.get('/jwt-test', middleware.verify, (req, res) => {
    res.status(200).json(req.user)
})

function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}

module.exports = router
