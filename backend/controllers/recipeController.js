const recipeModel = require('../models/recipeModel');
const recipeIngredientModel = require('../models/recipeIngredientModel');
const ingredientModel = require('../models/ingredientModel');

async function getAllRecipes(req, res) {
    recipeModel.findAll({
        include: 'ingredients' // Inclure les ingrédients liés à la recette
    }).then(
        (recipe) => {
            return res.status(200).json(recipe);
        }
    ).catch(error => {
        const message = 'Une erreur est survenue lors de la recherche des ingrédients';
        return res.status(404).json({ message, error })
    })
}

// Contrôleur pour récupérer une recette par son identifiant
async function getRecipeById(req, res) {
    try {
        const { recipeId } = req.params.id;

        // Recherche de la recette par son identifiant
        const recipe = await recipeModel.findByPk(req.params.id, {
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
}

async function addRecipes(req, res) {
    try {
        const { title, userId, ingredients } = req.body;

        // Création de la recette dans la base de données
        recipeModel.create({
            title,
            userId
        }).then(
            (recipe) => {
                for (let ingredient of ingredients) {
                    recipeIngredientModel.create({
                        ingredientId: ingredient.id,
                        recipeId: recipe.id,
                        quantity: ingredient.quantity,
                        step: ingredient.step || null,
                    })
                }
            }
        ).then(
            (response) => {
                const message = 'Reccette ajoutée';
                return res.status(201).json({ message });
            }
        );

    } catch (err) {
        console.error('Erreur lors de l\'ajout de la recette :', error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la recette.' });
    }
}

async function updateRecipe(req, res) {
    try {

        let { id, ingredients } = req.body;
        let recipe = await recipeIngredientModel.findAll({ where: { recipeId: id } })

        for (let ingredient of ingredients) {
            let recipeIngredientFound = recipe.find(recipeIngredient => recipeIngredient.ingredientId === ingredient.id_ingredient);
            if (recipeIngredientFound && recipeIngredientFound.ingredientId === ingredient.id_ingredient) {
              recipeIngredientFound.quantity = ingredient.quantity;
              await recipeIngredientFound.save();
            }
          }

        res.status(200).json({ recipe });

    } catch (err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function deleteRecipe(req, res) {
    try {
        let id = req.params.id;
        let deleted = await recipeModel.destroy({ where: { id: id } });
        (deleted === 1) ? res.status(200).json({ error: false, message: "DELETED"}) : res.status(200).json({ error: true, message: "NO_DELETED" });
    } catch (e) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function analyzeRecipe(req, res) {
    try {
        let id = req.params.id;
        let recipe = await recipeIngredientModel.findAll({ where: { recipeId: id } })
        if (recipe.length === 0) res.status(401).json("Recette introuvable");
        
        let stockIngredieintId = [];
        let totalOfCalories = 0;
        let ingredients = [];
        
        for (let ingredient of recipe) {
            stockIngredieintId.push(ingredient.ingredientId);
        }

        for (let i = 0; i < stockIngredieintId.length; i++) {
            ingredients.push(await ingredientModel.findOne({ where: { id: stockIngredieintId[i] } }))
            totalOfCalories += ingredients[i].calories * recipe[i].quantity;
        }   

        res.status(200).json(totalOfCalories);
    }
    catch (err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

module.exports = { getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, analyzeRecipe, addRecipes };