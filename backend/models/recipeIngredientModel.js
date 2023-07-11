const sequelize = require("../db.js")
const { DataTypes } = require('sequelize');

const recipe_ingredient = sequelize.define('recipe_ingredient', {
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    step:{
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = recipe_ingredient;