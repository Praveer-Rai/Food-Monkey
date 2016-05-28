var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeSchema = new Schema ({
    //image:
    ingredients: [String],
    directions: String,
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: {type: Date, default: Date.now},
    rating: 

});