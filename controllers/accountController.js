const User = require("../models/User");
const Recipes = require('../models/recipe')
const jwt = require('jsonwebtoken');

module.exports.myRecipes_get = async (req, res) => {
    let userID = '';
    // auth func should be called
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'david nyssen secret', (err, decodedToken) => {
            if (err) {
                res.json(false).status(400);
                console.log(err);
            } else {
                userID = decodedToken.id;
            }
        });
    } else {
        console.log('err');
        res.json(false).status(400);

    };
    let recipes = await Recipes.find({userID : userID})
    console.log(recipes)
    res.status(201).json(recipes);
}
