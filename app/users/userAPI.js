var config = require ('../../config/config.dev_local');
var Users = require ('./userSchema');
var secretKey = config.supersecretKey;
var jsonwebtoken = require('jsonwebtoken');
var express = require('express');

function createToken (user){
    var token = jsonwebtoken.sign({

        //informations to decode
        id: user._id,
        name: user.name,
        username: user.username

    }, secretKey, {
        expiresIn: '30m'
    });

    return token;
}

module.exports.signup = function(req,res){

    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    var user = new Users({
        name: req.name,
        username: req.username,
        password: req.password
    });

    var token = createToken(user);

    user.save(function(err){

        if (err){
            res.send(err);
            return;
        }

        res.json({
            success: true,
            message: 'User has been successfully created!',
            token: token
        });

    });

};

module.exports.login = function(req, res){

    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    Users.findOne({
        username: req.body.username
    }).select('username password').exec(function(err, user){

        if (err) {
            res.status(500).send(err);
            return;
        }

        if(!user){
            res.status(401).send({message: "Invalid User"});
        } else if (user){
            var validPassword = user.comparePassword(req.body.password);

            if (!validPassword){
                res.status(401).send ({message: "Invalid Password!"});
            } else {

                var token = createToken(user);

                res.status(200).json({

                    success: true,
                    message: "Successfully logged in",
                    token: token //tokens are encoded and to decode it u need the secretKey - contains all user info

                });
            }
        }
    })
};

/*
api.deregister = function(req, res){
    req.user.remove()
        .then(function(){
            res.status(200).send({message: "User successfully removed"})
        }), function(err){
            res.status(500).send(err);
        };
};
    */