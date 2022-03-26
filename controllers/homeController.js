
module.exports.getrecipe_post = async (req, res) => {
    const serchVal = req.body.value;
    let api;
    try {
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${serchVal}&app_id=c08ba36f&app_key=2e5c98200b0dd0211ff9f285f249efb6`)
            .then((response) => response.json())
            .then((data) => 
            {
                api = data;
                res.send(data).status(201);
            });
    }
    catch (err) {
        // console.log(err);
        res.status(400).send('error fetching recipes from api. limit 10 per minute')
    }
}