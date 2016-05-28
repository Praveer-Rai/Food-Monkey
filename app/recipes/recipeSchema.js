var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeSchema = new Schema ({
    //image:
    prepTime: {type: Number, min: 1},
    cookTime: {type: Number, min: 1},
    difficulty: {type: String, enum: ['beginner friendly', 'experienced', 'master chefs'], default: 'beginner friendly'},
    ingredients: [String],
    directions: [String],
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: {type: Date, default: Date.now},
    rating: {type: Number, default: 0}

});

module.exports = mongoose.model('Recipe', recipeSchema);