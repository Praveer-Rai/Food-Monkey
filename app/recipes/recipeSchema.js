var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeSchema = new Schema ({
    //image:
    preparationTime: number,
    cookingTime: number,
    difficulty: {type: string, enum: ['beginner friendly', 'experienced', 'master chefs'], default: 'beginner friendly'},
    ingredients: [String],
    directions: [String],
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: {type: Date, default: Date.now},
    rating: number

});

module.exports = mongoose.model('Recipe', recipeSchema);