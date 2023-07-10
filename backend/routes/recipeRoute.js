const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');
const { checkAuth } = require("../middlewares/auth");

router.get('/recipe', checkAuth, recipeController.getAllRecipes);
router.put('/recipe/:id', checkAuth, recipeController.updateRecipeById);
router.get('/recipe/:id', checkAuth, recipeController.getRecipeById);
router.delete('/recipe/{id}', checkAuth, recipeController.deleteRecipe);
router.get('/recipe/{id}/analyze', checkAuth, recipeController.analyzeRecipe);

module.exports = router;