const { Router } = require('express');
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController')
const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/protctedroute', authController.protctedroute_get);
router.post('/submitNewRecipe', dataController.submitNewRecipe_post)
module.exports = router;