const Recipes = require('../models/recipe')

module.exports.submitNewRecipe_post = async (req, res) => {
   console.log(req.body)
 let recipename = req.body.recipename;
    let ingredients = req.body.ingredients;
    let mealType = req.body.mealType;
    let directions = req.body.directions;
    let picture = req.body.picture;
    let preparationtime = req.body.preprationtime;
    try {
        const recipes = await Recipes.create({
            recipename, ingredients, mealType, directions,  preparationtime,
        })
        res.status(201).json(true);

    }
    catch(err) {
        console.log(err);
        res.status(400).json(false)
    }
}