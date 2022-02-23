const Recipes = require('../models/recipe')
module.exports.submitNewImage_post = async (req, res) => {
    console.log(req.file);

}
module.exports.submitNewRecipe_post = async (req, res) => {
    console.log(req.body)
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
        console.log(err);
        res.status(400).json(false)
    }
}