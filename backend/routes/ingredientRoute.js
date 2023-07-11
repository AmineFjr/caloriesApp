const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');
//const userAuth = require('../middleware/auth')

router.get('/ingredients', ingredientController.getAllIngredients);
router.post('/ingredient', ingredientController.addIngredient);
router.put('/ingredient/:id', ingredientController.updateIngredientById);
router.get('/ingredient/:id', ingredientController.getIngredientById);
router.delete('/ingredient/:id', ingredientController.deleteIngredient);

module.exports = router;