var recipeAPI = require ('./recipeAPI');
var express = require('express');
var unless = require('express-unless');

module.exports = function(passport){

    var router = express.Router();

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/recipes')
        .post(recipeAPI.createRecipe())
        .get(recipeAPI.getAllRecipes());

    router.route('/recipes/:recipe_id')
        .get(recipeAPI.getRecipe());

};