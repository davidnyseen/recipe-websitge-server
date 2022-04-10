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

module.exports.submitRating = async (req, res) => {
  let userID = '';
  console.log("in submit rating");
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

  //end of auth

  console.log("AFTER AUTH");

  let currentRate = req.body.rate;

  var id = req.body.curr_ID;
  console.log("THE ID IS: " + id);

  Recipes.findOne({_id: id}, function(err, foundRecipe) {
    if(err) {
      console.log(err);
      res.status(500).send();
    }
    else {
      console.log("EVERYTHING IS ALRIGHT UNTIL HERE");
      if(!foundRecipe) {
        res.status(404).send();
      }
      else {
        console.log("RECIPE FOUND");
        foundRecipe.ratingAverage = req.body.rate;

        foundRecipe.save(function(err, updateObject) {
          if(err) {
            console.log(err);
            res.status(500).send();
          } else {
            console.log(updateObject);
            console.log(res);
            res.send(updateObject);
          }
        })
      }
    }
  })


}