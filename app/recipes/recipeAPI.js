var Config = require ('../../config/config.dev_local');
var Recipes = require('./recipeSchema');

module.exports.getAllRecipes = function(req, res){
    Recipes.find(function(err, recipes){
        if (err){
            res.status(500).send(err);
        } else {
            res.json(recipes);
        }
    })
};

module.exports.getRecipe = function(req, res){
    Recipes.findById(req.params.recipe_id, function(err, recipe) {
        if (err) {
            res.status(500).send(err);
            return;
        };

        res.json(recipe);
    });
};

module.exports.createRecipe = function(req, res){

    var recipe = new Recipes({
        title: req.body.title,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        difficulty: req.body.difficulty,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    });

    recipe.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json('New Recipe Created!');
    });
};

module.exports.deleteRecipe = function(req, res){
    Recipes.findById(req.params.recipe_id, function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        //authorize
        if (m.user && req.user.equals(m.user)) {
            m.remove();
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }

    });
};