var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../users/userSchema');
var Config = require('../../config/config.dev_local');


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = Config.supersecretKey;

function verifyJwt(jwtPayload, done) {
    User.findOne({_id: jwtPayload.user._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}


module.exports = function(passport){
    passport.use(new JwtStrategy(opts, verifyJwt));
};