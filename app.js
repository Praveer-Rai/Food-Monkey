var Config = require('./config/config.dev_local');

/**
 * db connect
 */

var mongoose = require('mongoose');
mongoose.connect(Config.databaseHost, function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log('Connected to Database');
    }
});


/**
 * create application
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

/**
 * app setup
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//passport

var passport = require('passport');
var jwtConfig = require('./app/passport/jwtConfig');

app.use(passport.initialize());
jwtConfig(passport);


/**
 * routing
 */

var userRoutes = require("./app/users/userRoutes")(app, express);
var recipeRoutes = require("./app/recipes/recipeRoutes");

app.use('/', userRoutes);
app.use('/api', recipeRoutes(passport));

app.get('*', function(req,res){
    res.sendfile('./public/index.html');
});


module.exports = app;