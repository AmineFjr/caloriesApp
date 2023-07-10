const sequelize = require("../db.js")

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
    ingredients:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    },
});

module.exports = recipe;