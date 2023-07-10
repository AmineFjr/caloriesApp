const { Sequelize } = require('sequelize');

require('dotenv').config();

const dataBase = new Sequelize(process.env.Db_name, process.env.Db_user, process.env.Db_password, {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    }
})

module.exports =  dataBase.authenticate().then(
    () => {
        console.log('Connexion Réussie');
    },
).catch(error => {
    console.log("Impossible de se connecter à la base de données" + error)
})


