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


    } catch (err) {

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