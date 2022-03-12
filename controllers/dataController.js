const Recipes = require('../models/recipe')
const jwt = require('jsonwebtoken');

module.exports.submitNewRecipe_post = async (req, res) => {
  let userID = '';
  // auth func should be called
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'david nyssen secret', (err, decodedToken) => {
      if (err) {
        res.json(false).status(400);
      } else {
        userID = decodedToken.id;
      }
    });
  } else {
    res.json(false).status(400);
  };

  // end of auth

  let recipename = req.body.recipename;
  let ingredients = req.body.ingredients;
  let mealType = req.body.mealType;
  let directions = req.body.directions;
  let preparationtime = req.body.preprationtime;
  let imgUrl = req.body.imgUrl;
  try {
    const recipes = await Recipes.create({
      recipename, ingredients, mealType, directions, preparationtime,
      imgUrl, userID
    })
    res.status(201).json(true);

  }
  catch (err) {
    // const errors = handleErrors(err)
    // console.log(err);
    // res.status(400).json(errors)
  }
}