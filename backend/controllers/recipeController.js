const recipeModel = require('../models/recipeModel');
const recipeIngredientModel = require('../models/recipeIngredientModel');
const userModel = require ('../models/userModel');
const  ingredientModel = require ('../models/ingredientModel')

async function getAllRecipes(req, res){

    try {
        const recipes = await recipeModel.findAll({
            include: 'ingredients', // Inclure les ingrédients liés à la recette
        });

        const recipesWithUsers = [];

        for (let recipe of recipes) {
            let totalKcal = 0;
            const user = await userModel.findByPk(recipe.userId);
            for (let ingredient of recipe.ingredients) {
                totalKcal += ingredient.calories * ingredient.recipe_ingredient.quantity;
            }
            if (user) recipesWithUsers.push({ recipe, user, totalKcal });
        }
        const response = recipesWithUsers.map(recipesWithUser => {
            return {
                id: recipesWithUser.recipe.id,
                author: `${recipesWithUser.user.firstName} ${recipesWithUser.user.lastName}`,
                title: recipesWithUser.recipe.title,
                date: recipesWithUser.recipe.createdAt,
                ingredients: recipesWithUser.recipe.ingredients,
                totalKcal: recipesWithUser.totalKcal
            }
        })
        return res.status(200).json(response);
    } catch (error) {
        const message = 'Une erreur est survenue lors de la recherche des ingrédients';
        return res.status(404).json({message, error})
    }
}

// Contrôleur pour récupérer une recette par son identifiant
async function getRecipeById (req, res) {
    try {
        // Recherche de la recette par son identifiant
        let recipe = await recipeModel.findByPk(req.params.id, {
            include: 'ingredients' // Inclure les ingrédients liés à la recette
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Recette introuvable.' });
        }

        let user = await userModel.findByPk(recipe.userId);

        let recipeWithUser = [];
        recipeWithUser.push({ recipe, user });

        const response = recipeWithUser.map(recipeWithUser => {
            return {
                id: recipeWithUser.recipe.id,
                author: `${recipeWithUser.user.firstName} ${recipeWithUser.user.lastName}`,
                title: recipeWithUser.recipe.title,
                createdAt: recipeWithUser.recipe.createdAt,
                updatedAt: recipeWithUser.recipe.updatedAt,
                ingredients: recipeWithUser.recipe.ingredients
            }
        })
        return res.status(200).json(response);
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
    let recipeToJson = recipe.map(recipeIngredient => recipeIngredient.toJSON());
    let recipeIngredient = [];

    for (let ingredient of ingredients) {
        let recipeIngredientById = await recipeIngredientModel.findAll({ where: { ingredientId: ingredient.id_ingredient } })
        recipeIngredient.push(...recipeIngredientById);

        let recipeIngredientFound = recipe.find(recipeIngredient => recipeIngredient.ingredientId === ingredient.id_ingredient);

        if (recipeIngredientFound && recipeIngredientFound.ingredientId === ingredient.id_ingredient) {

            recipeIngredientFound.quantity = ingredient.quantity;
            await recipeIngredientFound.save();

        } else {
            await recipeIngredientModel.create({
                ingredientId: ingredient.id_ingredient,
                recipeId: id,
                quantity: ingredient.quantity,
                step: 1,
            });
        }
    }

    let findRecipeToDelete = recipeToJson.filter(obj1 => !recipeIngredient.some(obj2 => obj1['ingredientId'] === obj2['ingredientId']));
    findRecipeToDelete.forEach(async (element) => {  
        await recipeIngredientModel.destroy({ where: { ingredientId: element.ingredientId } });
    });

    res.status(200).json('Recette Modifiée');

    } catch (err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function deleteRecipe(req, res) {
    try {
        let id = req.params.id;
        let deleted = await recipeModel.destroy({ where: { id: id } });
        (deleted === 1) ? res.status(200).json({ error: false, message: "DELETED" }) : res.status(200).json({ error: true, message: "NO_DELETED" });
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

async function addRandomRecipe(req, res) {
    try {
        const { userId } = req.body;

        // Création de la recette dans la base de données
        recipeModel.create({
            'title': 'Recette aléatoire',
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

module.exports = { getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, analyzeRecipe, addRecipes, addRandomRecipe };