var userAPI = require('./userAPI');
var express = require('express');

module.exports = function(){

    var router = express.Router();

    router.post('/signup', userAPI.signup);
    router.post('/login', userAPI.login);


    return router;
};