const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body);
    fetch(
        'https://api.edamam.com/search?app_id=c08ba36f&app_key=2e5c98200b0dd0211ff9f285f249efb6&q=pizza'
    )
        .then((response) => response.json())
        .then((data) => {
            res.send(data);
        });
});

app.listen(5000, () => console.log('Server running on port 5000')); //  i am a server
