const ingredientModel = require('../models/ingredientModel');
const ingredientUtils = require('../utils/ingredients');

async function generateIngredientsData() {
    let ingredients = ingredientUtils.getAllIngredients();
    ingredients.forEach(async (ingredient) => { await ingredientModel.create({ name: ingredient.name, unit: ingredient.unit, calories: ingredient.calories }) });
    return ingredients;
}

async function getAllIngredients(req, res) {
    try {
        let ingredients = await ingredientModel.findAll({})
        if (ingredients.length === 0) {
            ingredients = await generateIngredientsData()
        }
        // Envoyer les données des ingrédients en tant que réponse
        (ingredients) ? res.status(200).json({ ingredients }) : res.status(200).json({ message: "NO_DATA" });
    } catch (err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function addIngredient(req, res) {
    try {
        let { name, unit, calories } = req.body;
        let ingredient = await ingredientModel.findOne({ where: { name: name } });

        if (!ingredient) {
            let createdIngredient = await ingredientModel.create({ name, unit, calories });
            res.status(200).json({ createdIngredient });
        } else {
            res.status(200).json({ message: "DATA_ALREADY_EXIST" });
        }
    } catch (err) {
        res.status(500).json({ err, message: "Une erreur s'est produite lors de l'ajout de l'ingrédient" });
    }
}


async function getIngredientById(req, res) {
    try {
        let id = req.params.id;
        let ingredient = await ingredientModel.findOne({ where: { id: id } });
        (ingredient) ? res.status(200).json({ ingredient }) : res.status(200).json({ message: "NO_DATA" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function updateIngredientById(req, res) {
    try {
        let id = req.params.id;
        let ingredient = await ingredientModel.findOne({ where: { id: id } });
        let { name, unit, calories } = req.body;

        if (name) ingredient.name = name;
        if (unit) ingredient.unit = unit;
        if (calories) ingredient.calories = calories;

        await ingredient.save();
        res.status(200).json({ ingredient });
    } catch (err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function deleteIngredient(req, res) {
    try {
        let id = req.params.id;
        let deleted = await ingredientModel.destroy({ where: { id: id } });
        (deleted === 1) ? res.status(200).json({ error: false, message: "DELETED" }) : res.status(200).json({ error: true, message: "NO_DELETED" });
    } catch (e) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function calculateCalories(req, res) {
    try {
        let tableOfId = req.body.id;
        let totalOfCalories = 0;
        let ingredients = [];
        for (let i = 0; i < tableOfId.length; i++) {
            ingredients.push(await ingredientModel.findOne({ where: { id: tableOfId[i] } }))
            totalOfCalories += ingredients[i].calories;
        }   
        res.status(200).json(totalOfCalories);
    } catch (err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

module.exports = { getAllIngredients, addIngredient, getIngredientById, updateIngredientById, deleteIngredient, calculateCalories };