const ingredientModel = require('../models/ingredientModel');

async function generateIngredientsData() {
    let ingredients = [
        { name: "Farine", quantity: 200, unit: "g", calories: 700 },
        { name: "Sucre", quantity: 100, unit: "g", calories: 400 },
        { name: "Beurre", quantity: 50, unit: "g", calories: 350 },
        { name: "Oeuf", quantity: 2, unit: "", calories: 140 },
        { name: "Lait", quantity: 150, unit: "ml", calories: 100 },
        { name: "Sel", quantity: 5, unit: "g", calories: 0 },
        { name: "Levure", quantity: 10, unit: "g", calories: 20 },
        { name: "Vanille", quantity: 1, unit: "cuillère à café", calories: 10 },
        { name: "Chocolat noir", quantity: 100, unit: "g", calories: 550 },
        { name: "Amandes", quantity: 50, unit: "g", calories: 320 },
        { name: "Miel", quantity: 30, unit: "g", calories: 90 },
        { name: "Levure chimique", quantity: 1, unit: "cuillère à café", calories: 5 },
        { name: "Cannelle", quantity: 1, unit: "cuillère à café", calories: 6 },
        { name: "Noix de coco râpée", quantity: 50, unit: "g", calories: 185 },
        { name: "Miel d'acacia", quantity: 40, unit: "g", calories: 120 },
        { name: "Framboises", quantity: 200, unit: "g", calories: 64 },
        { name: "Écorce d'orange confite", quantity: 50, unit: "g", calories: 180 },
    ];

    ingredients.forEach(async (ingredient) => {await ingredientModel.create({name : ingredient.name, quantity : ingredient.quantity, unit : ingredient.unit, calories : ingredient.calories})});
    return ingredients;
}
  
async function getAllIngredients(req, res) {
    try {
        let ingredients = await ingredientModel.findAll({})
        if (ingredients.length === 0){
            ingredients = await generateIngredientsData()
        }
        // Envoyer les données des ingrédients en tant que réponse
        (ingredients) ? res.status(200).json({ingredients}) : res.status(200).json({message:"NO_DATA"});
    } catch(err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function addIngredient(req, res) {
    try {
      let { name, quantity, unit, calories } = req.body; 
      let ingredient = await ingredientModel.findOne({ where: { name : name } });

      if (!ingredient) {
        let createdIngredient = await ingredientModel.create({ name, quantity, unit, calories });
        res.status(200).json({ createdIngredient });
      } else {  
        res.status(200).json({ message:"DATA_ALREADY_EXIST" });
      }
    } catch (err) {
      res.status(500).json({ err, message: "Une erreur s'est produite lors de l'ajout de l'ingrédient" });
    }
  }
  

async function getIngredientById(req, res){
    try {
        let id  = req.params.id;
        let ingredient = await ingredientModel.findOne({ where: { id : id } });
        (ingredient) ? res.status(200).json({ingredient}) : res.status(200).json({message:"NO_DATA"});
    } catch(err) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function updateIngredientById(req, res){
    try {
        let id  = req.params.id;
        let ingredient = await ingredientModel.findOne({ where: { id : id } });
        let { name, quantity, unit, calories } = req.body; 

        if (name) ingredient.name = name;
        if (quantity) ingredient.quantity = quantity;
        if (unit) ingredient.unit = unit;
        if (calories) ingredient.calories = calories;

        await ingredient.save();
        res.status(200).json({ ingredient });
    } catch (err){
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

async function deleteIngredient(req, res){
    try {
        let id  = req.params.id;
        let deleted = await ingredientModel.destroy({ where: { id : id } });
        (deleted === 1) ? res.status(200).json({error:false,message:deleted}) : res.status(200).json({error:true,message:"NO_DELETED"});
    } catch (e) {
        res.status(500).json({ err, message: "Une erreur s'est produite" });
    }
}

module.exports = { getAllIngredients, addIngredient, getIngredientById, updateIngredientById, deleteIngredient };