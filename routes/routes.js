const { Router } = require('express');
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController')
const imageController = require('../controllers/imageController')
const accountController = require('../controllers/accountController');
const homeController = require('../controllers/homeController');

const router = Router();
const multer  = require('multer')
const upload = multer({ dest : 'images' })

router.post('/', homeController.getrecipe_post);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/protctedroute', authController.protctedroute_get);
router.post('/submitNewRecipe', dataController.submitNewRecipe_post)
router.post('/submitNewImage', upload.single('image'), imageController.submitNewImage_post)
router.get('/getImage/:key', imageController.getImage_get);
router.get('/myAccount', accountController.myRecipes_get);

module.exports = router;