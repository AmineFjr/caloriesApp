const { Sequelize, DataTypes} = require('sequelize');

const bcrypt = require("bcrypt");

const  userModel = require('../models/userModel');

require('dotenv').config();

const dataBase = new Sequelize('caloriesApp', process.env.Db_user, process.env.Db_password, {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    }
})

dataBase.authenticate().then(
    () => {
        console.log('Connexion Réussie');
    },
).catch(error => {
    console.log("Impossible de se connecter à la base de données" + error)
})

const User = userModel(dataBase, DataTypes);

const initDb = () => {
    return dataBase.sync({ force: true }).then(() => {
        bcrypt.hash(`root`, 10).then((hash) => {
            User.create({
                firstName: "Admin",
                lastName: "Admin",
                email: `root@gmail.com`,
                password: hash,
                isAdmin: true,
            }).then((user) => console.log(user.toJSON()));
        });
        console.log("la base de données est initialisée.");
    });
};

module.exports = { initDb, User };