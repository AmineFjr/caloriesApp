const recipeModel = require('../models/recipeModel');
const recipeIngredientModel = require('../models/recipeIngredientModel');
const userModel = require('../models/userModel');
const ingredientModel = require('../models/ingredientModel');

/*
*
* Get recipe information by id
*/
async function getRandomRecipeInformationById(id) {
    let recipe = await recipeModel.findByPk(id, {
        include: 'ingredients' // Inclure les ingrédients liés à la recette
    });

    let recipeIngredient = await recipeIngredientModel.findAll({ where: { recipeId: id } })
    let stockIngredieintId = [];
    let ingredients = [];
    let totalOfCalories = 0;

    for (let ingredient of recipeIngredient) {
        stockIngredieintId.push(ingredient.ingredientId);
    }

    for (let i = 0; i < stockIngredieintId.length; i++) {
        ingredients.push(await ingredientModel.findOne({ where: { id: stockIngredieintId[i] } }))
        totalOfCalories += ingredients[i].calories * recipeIngredient[i].quantity;
    }

    let recipeWithUser = [];

    if (!recipe) return res.status(404).json({ message: 'Recette introuvable.' });

    let user = await userModel.findByPk(recipe.userId);

    recipeWithUser.push({ recipe, user });

    

    const response = recipeWithUser.map(recipeWithUser => {
        return {
            id: recipeWithUser.recipe.id,
            author: `${recipeWithUser.user.firstName} ${recipeWithUser.user.lastName}`,
            title: recipeWithUser.recipe.title,
            createdAt: recipeWithUser.recipe.createdAt,
            updatedAt: recipeWithUser.recipe.updatedAt,
            recipe_ingredients : recipeIngredient,
            ingredients: ingredients,
            totalKcal: totalOfCalories
        }   
    })

    return response[(recipeWithUser.length) - 1];
}

module.exports = { getRandomRecipeInformationById };