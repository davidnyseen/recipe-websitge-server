const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'david nyssen secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.json(false).status(400);
      } else {
        res.json(true).status(201);
      }
    });
  } else {
    res.json(false);
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'david nyssen secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };