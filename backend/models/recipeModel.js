const sequelize = require("../db.js")
const { DataTypes } = require('sequelize');

const recipe = sequelize.define('recipe', {
        title:{
            type: DataTypes.STRING,
            allowNull: false    
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false
        },
        publication_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
});

module.exports = recipe;