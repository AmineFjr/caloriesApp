const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute')
const ingredientRoute = require('./routes/ingredientRoute')
const recipeRoute = require('./routes/recipeRoute')
const sequelize = require ('./db');
const recipeIngredientModel = require ('./models/recipeIngredientModel')

app.use(express.json());

// Gestion des CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// Corps des requêtes des req.body
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api', ingredientRoute);
app.use('/api', recipeRoute);

const recipe = require ('./models/recipeModel');
const ingredient = require ('./models/ingredientModel');
const user = require('./models/userModel');


try {
    sequelize.authenticate().then(() => {});
    sequelize.sync().then(() => {})
    user.hasMany(recipe);
    recipe.belongsToMany(ingredient, { through: 'recipe_ingredient' ,  as: 'ingredients' });
    ingredient.belongsToMany(recipe, { through: 'recipe_ingredient', as: 'recipe'  });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = app;