const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const recipeSchema = new mongoose.Schema({
    recipename:{
        type: String,
        required: [true, 'Please enter a name']
    },
    preparationtime:{
        type: String,
        required: [true, 'Please enter preparation time']
    },
    ingredients:{
        type: [],
        required: [true, 'Please enter ingredients']
    },
    picture:{
        type: {},
        // required: [true, 'Please enter picture']
    },
    mealType:{
        type: String,
        required: [true, 'Please enter mealType']   
     },
     directions:{
        type: String,
        required: [true, 'Please enter directions']   
     }
})
const Recipes = mongoose.model('recipes', recipeSchema);
module.exports = Recipes;