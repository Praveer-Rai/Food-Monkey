var recipeAPI = require ('./recipeAPI');
var express = require('express');
var unless = require('express-unless');

module.exports = function(passport){

    var router = express.Router();

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.post('/create_recipe', recipeAPI.createRecipe);
    router.get('/all_recipes', recipeAPI.getAllRecipes);

    router.get('/:recipe_id', recipeAPI.getRecipe);

    return router;
};