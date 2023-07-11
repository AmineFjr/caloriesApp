const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');
//const { checkAuth } = require("../middlewares/auth");

router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipe', recipeController.addRecipes);
router.put('/recipe/:id', recipeController.updateRecipeById);
router.get('/recipe/:id', recipeController.getRecipeById);
router.delete('/recipe/{id}', recipeController.deleteRecipe);
router.get('/recipe/{id}/analyze', recipeController.analyzeRecipe);

module.exports = router;