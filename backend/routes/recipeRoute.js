const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const userAuth = require('../middleware/auth');


router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipe', userAuth, recipeController.addRecipes);
router.put('/recipe',  recipeController.updateRecipe);
router.get('/recipe/:id', recipeController.getRecipeById);
router.delete('/recipe/:id', recipeController.deleteRecipe);
router.get('/recipe/:id/analyze', recipeController.analyzeRecipe);
router.post('/recipe/random', recipeController.addRandomRecipe);

module.exports = router;