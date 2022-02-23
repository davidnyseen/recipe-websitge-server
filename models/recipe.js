const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const recipeSchema = new mongoose.Schema({
    recipename:{
        type: String,
        required: [true, 'Please enter a name'],
        minlength: [6, 'Minimum recipe name length is 6 characters'],

    },
    preparationtime:{
        type: String,
        required: [true, 'Please enter preparation time']
    },
    ingredients:{
        type: [],
        required: [true, 'Please enter ingredients']
    },
    mealType:{
        type: String,
        required: [true, 'Please enter mealType']   
     },
     imgUrl:{
        type: String,
        required: [true, 'error getting image']   
     },     directions:{
        type: String,
        required: [true, 'Please enter directions'],
        minlength: [6, 'Minimum recipe name length is 6 characters'],
     }
})
const Recipes = mongoose.model('recipes', recipeSchema);
module.exports = Recipes;