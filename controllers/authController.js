const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }
  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'david nyssen secret', {
    expiresIn: maxAge
  });
};

module.exports.signup_post = async (req, res) => {
  email = req.body.emailRes;
  password = req.body.passwordRes;
  let name = req.body.name;
  try {
    const user = await User.create({ email, password, name });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user.name });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  email = req.body.emailRes;
  password = req.body.passwordRes;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.name });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}
module.exports.protctedroute_get = (req, res) => {
    const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'david nyssen secret', (err, decodedToken) => {
      if (err) {
        console.log('protctedroute_get err ')
        res.json(false).status(400);
      } else {
        console.log('protctedroute_get true ')
        res.json(true).status(201);
      }
    });
  } else {
    console.log('protctedroute_get no token ')
    res.json(false);
  
};

}
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json(true);
}

// there are a few types of requst from clients,
// in all cases we return false or true. 
// case: login. server sends back "true"
// case register
// case: enter protected path.