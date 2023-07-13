const sequelize = require("../db.js")
const { DataTypes } = require('sequelize');

const ingredient = sequelize.define('ingredient', {
    name:{
        type: DataTypes.STRING,
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
},     
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = ingredient;