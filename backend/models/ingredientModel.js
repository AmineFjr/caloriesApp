const sequelize = require("../db.js")
const { DataTypes } = require('sequelize');

const ingredient = sequelize.define('ingredient', {
    name:{
        type: DataTypes.STRING,
        allowNull: false    
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit:{
        type: DataTypes.STRING,
        allowNull: false
    },
    calories:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = ingredient;