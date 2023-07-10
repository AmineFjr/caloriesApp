const ingredientModel = require('../models/ingredientModel');

async function getAllIngredients(req, res){
    try {
        // Logique pour récupérer les données des ingrédients depuis la source de données
        let ingredients = await ingredientModel.findAll({}); // Supposons que vous utilisez une base de données et un modèle appelé IngredientModel

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

      /*res.status(200).json({ ingredient });
      return; */
      if (!ingredient) {
        let createdIngredient = await ingredientModel.create({ name, quantity, unit, calories });
        // Envoyer les données des ingrédients en tant que réponse
        res.status(200).json({ createdIngredient });
      } else {  
        res.status(200).json({ ingredient });
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

        ingredient.name = name;
        ingredient.quantity = quantity;
        ingredient.unit = unit;
        ingredient.calories = calories;

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