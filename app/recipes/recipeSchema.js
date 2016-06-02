var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeSchema = new Schema ({
    //image:
    title: String,
    prepTime: {type: Number, min: 1},
    cookTime: {type: Number, min: 1},
    difficulty: {type: String, enum: ['easy', 'medium', 'hard'], default: 'easy'},
    ingredients: [{
        amount: Number,
        ingredientName: String
    }],
    directions: String,
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: {type: Date, default: Date.now},
    rating: {type: Number, default: 0}

});

module.exports = mongoose.model('Recipe', recipeSchema);