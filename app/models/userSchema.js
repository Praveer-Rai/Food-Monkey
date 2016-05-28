var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); //for hashing

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    firstname: String,
    lastname: String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}

});

//Hash the password using Mongoose
UserSchema.pre('save', function(next){

    var user = this;

    //if user password is not modified, go to next matching route
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.hash(user.password, null, null, function(err, hash){
        if (err){
            return next(err);
        }

        user.password = hash;

        next();
    });

});

UserSchema.methods.comparePassword = function(password){

    var user = this;

    //compares the password entered with the one in the database
    return bcrypt.compareSync(password, user.password);

};

//export the object
module.exports = mongoose.model('User', UserSchema);