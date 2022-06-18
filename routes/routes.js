const { Router } = require("express");
const authController = require("../controllers/authController");
const dataController = require("../controllers/dataController");
const imageController = require("../controllers/imageController");
const accountController = require("../controllers/accountController");
const homeController = require("../controllers/homeController");
const saveController = require("../controllers/saveController");
const categoryController = require('../controllers/categoryController');
const recommendedController = require('../controllers/recommendedController');
const jwt = require("jsonwebtoken");

const router = Router();
const multer = require("multer");
const upload = multer({ dest: "images" });

function auth(req, res, next) {
  // console.log("save_pos " + req.body.value);

  const token = req.cookies.jwt;
  let userID = "";
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "david nyssen secret", (err, decodedToken) => {
      if (err) {
        res.json(false).status(400);
        return;
      } else {
        console.log("confirmed login");
        userID = decodedToken.id;
        req.admin = userID;
        next();
        // console.log("user loggedin");
        return;
      }
    });
  } else {
    // console.log("token is " + token);
    res.json(false).status(400);
    return;
  }
}
router.post("/saverecipe", auth, saveController.save_post);
router.post("/", homeController.getrecipe_post);
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/protctedroute", authController.protctedroute_get);
router.post("/submitNewRecipe", dataController.submitNewRecipe_post);
router.post(
  "/submitNewImage",
  upload.single("image"),
  imageController.submitNewImage_post
);
router.get('/', (req, res) => {
  res.json({msg: 'hello'});
})
router.get("/getImage/:key", imageController.getImage_get);
router.get("/myAccount/myUploads", auth, accountController.myUploads_get);
router.get("/myAccount/savedRecipes",auth, accountController.savedRecipes_get);
router.post("/submitRating", dataController.submitRating);
router.post('/getCategory', categoryController.getrecipe_category);
router.post('/setRecommendation', auth, dataController.setRecommendationForm);
router.post('/getRecommended', auth, recommendedController.getRecommendedRecipes);
router.post('/getFormStatus', auth, recommendedController.getFormStatus);



module.exports = router;
