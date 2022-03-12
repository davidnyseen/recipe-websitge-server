const { Router } = require('express');
const router = Router();
const accountController = require('../controllers/accountController');

router.get('/myAccount', accountController.myRecipes_get);
