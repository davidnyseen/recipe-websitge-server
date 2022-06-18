const Recipes = require('./../models/recipe');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');

const fetch = require('node-fetch');

module.exports.getFormStatus = async (req, res) =>
{
    console.log("In server, sending form status");

    Users.findOne({ _id: req.body.currUsrID}, function(err, found)
    {
        let formStatus = found.recommendationSet;

        res.send(formStatus);
    })
}


module.exports.getRecommendedRecipes = async (req, res) =>
{
    //console.log("Getting recommended..." + req.body.currUsrID);
    //const favCuisine = req.body.
    
    Users.findOne({_id: req.body.currUsrID}, async function(err, found)
    {
        if(!err)
        {
            if(!found.usrPreferences[0].favCuisineType) return;
            console.log("SENDING BACK RECOMMENDATIONS");
            let favCuisine = found.usrPreferences[0].favCuisineType;
            console.log(favCuisine);

            let exclIngredient = found.usrPreferences[0].excludedIngredient;

            let wantedTime = found.usrPreferences[0].recipeTime;

            var tempArr = await Recipes.find({});

            var filteredArr = tempArr.filter(item => item.cuisineType === favCuisine);
            //console.log("Filtered recipes: " + filteredArr);

            for(let count=0; count <filteredArr.length; count++)//NOW WE EXCLUDE THE RECIPES WHO CONTAIN THE INGREDIENT
            {
                //console.log("GET INGREDIENTS: " + filteredArr[count].ingredients);

                if(filteredArr[count].ingredients.find(element => element === exclIngredient))
                {
                    //console.log(filteredArr[count].ingredients.find(element => element === exclIngredient));
                    filteredArr.splice(count, 1);
                    //console.log("FOUND A RECIPE WITH ONIONS");
                    console.log(filteredArr.length);
                    count = 0;
                }
            }

           // console.log("AFTER REMOVING INGREDIENT: " + filteredArr);

           //NOW WE FILTER THE TIME

           if(wantedTime)
           {
            filteredArr = filteredArr.filter(item => item.preparationtime <= wantedTime);
           }


            //NOW ITS TIME TO PICK 3 RECIPES FROM THE ARRAY
            let size = filteredArr.length;
            let i = 0, j=0;
            if(size > 3)
            {
                i = parseInt(Math.random() * ((size - 3) - 1) + 1);
                j = 3;
            }
            else if(size == 3)
            {
                i=0;
                j=3;
            }
            else if(size == 2)
            {
                i = 0;
                j = 2;
            }
            else if(size == 1)
            {
                i = 0;
                j = 1;
            }

            console.log(i);

            var returnedArr;

            /*for(i, j=0; i<i+3; i++, j++)
            {
                returnedArr[j] = filteredArr[i];
            }*/

            //returnedArr = filteredArr.slice(1, 3);
            filteredArr = filteredArr.sort(() => 0.5 - Math.random());

            console.log("SLICE TEST: " + filteredArr.slice(i,i+j));

            //console.log("FILTERED RESULT: " + filteredArr);
            
            res.send(filteredArr.slice(i,i+j));
        }
        else
        {
            console.log(err);
            res.status(500).send();
        }
    });

}