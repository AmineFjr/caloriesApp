const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute')
const userIngredient = require('./routes/ingredientRoute')

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
app.use('/api', userIngredient);


module.exports = app;