const Recipes = require('../models/recipe')
const jwt = require('jsonwebtoken');
const Users = require('../models/User');

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
  let cuisineType = req.body.cuisineType;
  let author = req.body.login.user;

  //Recipes.findOne({})

  try {
    const recipes = await Recipes.create({
      recipename, ingredients, mealType, cuisineType, directions, preparationtime,
      imgUrl, userID, author
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

  Recipes.findOne({ _id: req.body.curr_ID }, function (err, found) {
    if (!err) {
      console.log("FOUND");
      console.log("REQUEST IS:" + req.body.userRating);
      console.log(found.allRatings.length);
      let ratingSum = 0;
      if (found.allRatings.length >= 1) {
        for (let i = 0; i < found.allRatings.length; i++) {
          ratingSum += found.allRatings[i].rate;

          console.log("in loop");
          if (found.allRatings[i].id == req.body.userRating.id) {
            console.log("Already saved");
            /*found.ratingAverage = 0;
            found.allRatings = [];
            found.numberOfRatings = 0;*/
            break;
          }
          if (i == found.allRatings.length - 1) {
            found.numberOfRatings += 1;
            //found.ratingAverage = req.body.userRating.rate;
            found.ratingAverage = parseInt((ratingSum + req.body.userRating.rate) / found.numberOfRatings);
            found.allRatings.push(req.body.userRating);//FOR RATING LIST
            /*found.ratingAverage = 0;
            found.allRatings = [];*/
            break;
          }
          // console.log(found.allRatings[i]);
        }
      }
      else {
        found.numberOfRatings += 1;
        found.ratingAverage = req.body.userRating.rate;
        found.allRatings.push(req.body.userRating);
        /*found.ratingAverage = 0;
        found.allRatings = [];*/
      }
      found.save(function (err, updateObject) {
        if (err) {
          console.log(err);
          res.status(500).send();
        } else {
          console.log(updateObject);
          res.send(updateObject);
        }
      })


    }
    else {
      console.log("BRUH");
    }
  })
}

module.exports.setRecommendationForm = async (req, res) => {
  // auth func should be called
  /*const token = req.cookies.jwt;
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
  };*/

  console.log("PREFERENCES:" + req.body.preferences.favCuisineType);

  Users.findOne({ _id: req.body.curr_ID }, function (err, found) {
    if (err) {
      console.log(err);
      res.send("Error finding user").status(400);
    }
    else {
      if (found.recommendationSet == true) {
        console.log("Recommendations already set");
        res.json("Recommendations already set").status(400);
        return;
      }
    }
  });

  var query = { '_id': req.body.curr_ID };

  Users.findOneAndUpdate(query, { recommendationSet: req.body.value }, { new: true },
    function (error, success) {
      if (error) {
        console.log(error);
        res.json("error findOneAndUpdate").status(400);

      }
      else {
        console.log("SUCSS" + success);
        //res.json(true).status(200);
        Users.findOneAndUpdate({ _id: req.body.curr_ID },
          {$push: {usrPreferences: req.body.preferences}},
          { new: true },
          function (err, found) {
          if (err) {
            console.log(err);
            res.send("Error finding user").status(400);
          }
          else
          {
            //res.json(true).status(200);
            console.log(found);
            res.send(found);
          }
        });
      }
    });


    /*console.log("CONFIRM REC");
    res.json(true).status(200);*/




};