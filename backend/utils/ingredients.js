const ingredientModel = require('../models/ingredientModel');
const ingredients = [
    { name: "Farine", unit: "g", calories: 700 },
    { name: "Sucre", unit: "g", calories: 400 },
    { name: "Beurre", unit: "g", calories: 350 },
    { name: "Oeuf", unit: "", calories: 140 },
    { name: "Lait", unit: "ml", calories: 100 },
    { name: "Sel", unit: "g", calories: 0 },
    { name: "Levure", unit: "g", calories: 20 },
    { name: "Vanille", unit: "cuillère à café", calories: 10 },
    { name: "Chocolat noir", unit: "g", calories: 550 },
    { name: "Amandes", unit: "g", calories: 320 },
    { name: "Miel", unit: "g", calories: 90 },
    { name: "Levure chimique", unit: "cuillère à café", calories: 5 },
    { name: "Cannelle", unit: "cuillère à café", calories: 6 },
    { name: "Noix de coco râpée", unit: "g", calories: 185 },
    { name: "Miel d'acacia", unit: "g", calories: 120 },
    { name: "Framboises", unit: "g", calories: 64 },
    { name: "Écorce d'orange confite", unit: "g", calories: 180 },
];

/*
* Generate random ingredients from local ingredients array
*/
function getRandomIngredients () {
    let randomIngredients = [];
    let numberOfIngredients = Math.floor(Math.random() * 4) + 1;
    
    for (let i = 0; i < numberOfIngredients; i++) {
      let randomIndex = Math.floor(Math.random() * ingredients.length);
      randomIngredients.push(ingredients[randomIndex]);
    } 
    return randomIngredients;
}

/*
* Get all ingredients from local ingredients array
*/
function getAllIngredients () {
    return ingredients;
}

/*
* Generate random ingredients from database
*/
async function genrerateRandomIngredients(req, res) {
    let dataBaseIngredient = await ingredientModel.findAll({})
    let randomIngredients = [];
    let numberOfIngredients = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < numberOfIngredients; i++) {
        let randomIndex = Math.floor(Math.random() * dataBaseIngredient.length);
        randomIngredients.push(dataBaseIngredient[randomIndex]);
    } 
    return randomIngredients;
}

module.exports = { getAllIngredients , getRandomIngredients, genrerateRandomIngredients };