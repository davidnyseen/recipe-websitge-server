const express = require('express');
const mongoose = require('mongoose'); 
const Routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const fetch = require('node-fetch');
const cors = require('cors');
const secret = require('./secret')
const multer = require('multer')
const upload = multer({ dest: 'images/' })
const Recipes = require('./models/recipe');
const { EnvironmentCredentials } = require('aws-sdk');
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('*', (req, res, next) => {
  res.header(`Access-Control-Allow-Origin: https://recipe-website-server.herokuapp.com/`);
  res.header("Access-Control-Allow-Credentials: true");
  res.header("Access-Control-Allow-Methods: GET, POST");
  res.header("Access-Control-Allow-Headers: Content-Type, *");
  next()
})
// view engine

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
// let app_id = 'c08ba36f';
// let app_key = '2e5c98200b0dd0211ff9f285f249efb6';

const findRecipe = async (serchVal) => {
  return await Recipes.find({ recipename: /pizza/ }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
}


mongoose.connect('mongodb+srv://david:alisacara1@cluster0.mggk8.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));

app.use(Routes);