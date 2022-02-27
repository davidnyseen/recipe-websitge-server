const Recipes = require('../models/recipe')
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// app.use(auth)
// handle errors
// const handleErrors = (err) => {
// //   // validation errors
// //   const errors;
// //   if (err.message.includes('user validation failed')) {
// //     // console.log(err);
// //     Object.values(err.errors).forEach(({ properties }) => {
// //       // console.log(val);
// //       // console.log(properties);
// //       errors[properties.path] = properties.message;
// //     });
// //   }
// //   return errors;
// // }
// function auth(req, res, next) {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, 'david nyssen secret', (err, decodedToken) => {
//       if (err) {
//         req.admin = false;
//         next();
//         return;
//       }
//       else {
//         req.admin = true;
//         console.log(logedin)
//         next();
//         return;
//       }
//     });
//   } else {
//     req.admin = false;
//     next();
//     return;
//   };
// }
module.exports.submitNewRecipe_post = async (req, res) => {
  // auth func should be called
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'david nyssen secret', (err, decodedToken) => {
      if (err) {
        res.json(false).status(400);
      } else {
        console.log(decodedToken.id)
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
      imgUrl
    })
    res.status(201).json(true);

  }
  catch (err) {
    // const errors = handleErrors(err)
    // console.log(err);
    // res.status(400).json(errors)
  }
}