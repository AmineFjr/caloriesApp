const recipeModel = require('../models/recipeModel');

async function getAllRecipes(req, res){
    try {
        // Logique pour récupérer les données des ingrédients depuis la source de données
        let recipes = await recipeModel.findAll({}); // Supposons que vous utilisez une base de données et un modèle appelé IngredientModel

        // Envoyer les données des ingrédients en tant que réponse
        (recipes) ? res.status(200).json({recipes}) : res.status(200).json({message:"NO_DATA"});
    } catch(err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function getRecipeById(req, res){
    try {
    }
    catch(err){
        console.log(err)
    }
}

async function updateRecipeById(req, res){
    try {
    }
    catch(err){
        console.log(err)
    }
}

async function deleteRecipe(req, res){
    try {
    }catch (e) {
        console.error(e)
    }
}

async function analyzeRecipe(req, res){
    try{
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {getAllRecipes, getRecipeById, updateRecipeById, deleteRecipe, analyzeRecipe};