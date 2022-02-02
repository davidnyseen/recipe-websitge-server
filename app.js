const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const fetch = require('node-fetch');
const cors = require('cors');
const secret = require('./')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const corsOptions = {
    origin: true,
    credentials:  true,
    optionSuccessStatus: 200,
};

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
let app_id = 'c08ba36f';
let app_key = '2e5c98200b0dd0211ff9f285f249efb6';
app.post('/', (req, res) => {
    // console.log(req.body.value);
  try {
    fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${req.body.value}&app_id=c08ba36f&app_key=2e5c98200b0dd0211ff9f285f249efb6`
    )
    
        .then((response) => response.json())
        .then((data) => {
            res.send(data).status(201);
        });
  }
  catch(err){
      // console.log(err);
      res.status(400).send('error')
  }
});
// database connection
const dbURI = 'mongodb+srv://david:alisacara1@cluster0.fddex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

// routes
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/protectedroute', requireAuth);
app.use(authRoutes);