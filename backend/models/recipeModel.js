module.exports = (sequelize, DataTypes) => {
    return sequelize.define('recipe', {
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
    })
}