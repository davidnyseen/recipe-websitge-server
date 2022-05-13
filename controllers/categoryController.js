const Recipes = require('./../models/recipe');
const fetch = require('node-fetch');

const findCategory = async (serchVal) => {
    return await Recipes.find({ mealType: {"$regex": serchVal} }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        return data;
      }
    });
  }

module.exports.getrecipe_category = async (req, res) =>
{
    const category = req.body.value;
    let result = [];

    console.log("IN CATEGORY");
    
    try {
        result = await findCategory(category);
        res.send({result}).status(201);
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}