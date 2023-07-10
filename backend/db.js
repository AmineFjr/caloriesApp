const { Sequelize} = require('sequelize');

require('dotenv').config();

const dataBase = new Sequelize(process.env.TABLE_BDD, process.env.USER_BDD, process.env.PASSWORD_BDD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: process.env.SOCKET_APP,
    }
})

module.exports = dataBase.authenticate().then(
    () => {
        console.log('Connexion Réussie');
    },
).catch(error => {
    console.log("Impossible de se connecter à la base de données" + error)
})

module.exports = dataBase;


