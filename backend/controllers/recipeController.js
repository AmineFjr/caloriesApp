const recipeModel = require('../models/recipeModel');
const ingredientModel = require('../models/ingredientModel')
const recipeIngredientModel = require('../models/recipeIngredientModel');
const {DataTypes} = require("sequelize");
async function getAllRecipes(req, res){
    try {
        let recipes = await recipeModel.findAll({});
        (recipes) ? res.status(200).json({recipes}) : res.status(200).json({message:"NO_DATA"});
    } catch(err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

// Contrôleur pour récupérer une recette par son identifiant
async function getRecipeById (req, res) {
    try {
        const { recipeId } = req.params;

        // Recherche de la recette par son identifiant
        const recipe = await recipeModel.findByPk(recipeId, {
            include: 'ingredients' // Inclure les ingrédients liés à la recette
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Recette introuvable.' });
        }

        return res.status(200).json(recipe);
    } catch (error) {
        console.error('Erreur lors de la récupération de la recette :', error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la recette.' });
    }
};

async function addRecipes(req, res) {
    try {
                const { title, author, ingredients, quantity, step } = req.body;

                // Création de la recette dans la base de données
                recipeModel.create({
                    title,
                    author,
                    ingredients,
                }).then(
                    (recipe) => {
                        recipeIngredientModel.create( {
                            ingredientId: ingredients,
                            recipeId: recipe.id,
                            quantity: quantity,
                            step: step,
                        })
                    }
                ).then(
                    (response) => {
                        return res.status(201).json(response);
                    }
                );

    } catch (err) {
        console.error('Erreur lors de l\'ajout de la recette :', error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la recette.' });
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

module.exports = {getAllRecipes, getRecipeById, updateRecipeById, deleteRecipe, analyzeRecipe, addRecipes};