const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10).then((hash)=>{
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save().then(()=>{
            res.status(201).json({
                message: 'User has been added successfully!'
            })
        }).catch((error)=>{
            res.status(500).json({
                error: error
            })
        })
    })
};