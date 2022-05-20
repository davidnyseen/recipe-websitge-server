const { application } = require("express");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");


module.exports.save_post = async (req, res) => {
    let userID, recipe;
    if(req.admin){
        userID = req.admin;

    }else{
        console.log("err");
        res.send("error findById").status(400);

    }
    if(req.body.value){
        recipe = req.body.value;
    }else{
        console.log("err");
        res.send("error findById").status(400);

    }
    //check if recipe waas saved
    let user = await UserModel.findById(userID, function(err, docs){
        if(err){
            console.log(err);
            res.send("error findById").status(400)
        }
    });

    let saved = user.likedRecipes;
    for(let i=0; i< saved.length; i++){
        if(saved[i]==recipe){
            res.json("recipe saved alredy").status(400)
            return;
        }
    }
    // save recipe to liked recipes
    var query = {'_id': userID};
    UserModel.findOneAndUpdate(
        query,  
        { $push: { likedRecipes: recipe  } },
        {useFindAndModify: false},
       function (error, success) {
             if (error) {
                 console.log(error);
                 res.json("error findOneAndUpdate").status(400)

             }
             else{
                 res.json(true).status(200)
             }
         });
     
}
