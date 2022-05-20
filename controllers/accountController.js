const User = require("../models/User");
const Recipes = require("../models/recipe");
const jwt = require("jsonwebtoken");

module.exports.myUploads_get = async (req, res) => {
  let userID;
  if (req.admin) {
    userID = req.admin;
  } else {
    console.log("err");
    res.send("error findById").status(400);
  }
  let recipes = await Recipes.find({ userID: userID }, function (err, docs) {
    if (err) {
      console.log(err);
    }
  });
  res.status(201).json(recipes);
};

module.exports.savedRecipes_get = async (req, res) => {
  let userID;
  if (req.admin) {
    userID = req.admin;
  } else {
    console.log("err");
    res.send("error findById").status(400);
  }
  let user = await User.findById(userID, function (err, docs) {
    if (err) {
      console.log(err);
      res.send("error findById").status(400);
    }
  });
  let saved = user.likedRecipes;
  let arr=[];
  for(let i=0; i<saved.length; i++){
    let recipe = await Recipes.findById(saved[i], function (err, docs) {
        if (err) {
          console.log(err);
          res.send("error findById").status(400);
        }
    })
    arr.push(recipe);
  }
//   console.log(arr);
  res.status(201).json(arr);
};
