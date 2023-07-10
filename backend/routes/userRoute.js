const express = require ('express')
const routes = express.Router();
const userAuth = require('../middleware/auth')
const userCtrl = require('../controllers/userController')


routes.post('/signup', userCtrl.singUp);
routes.post('/login', userCtrl.sign);
routes.get('/:id', userCtrl.getUser);
routes.put("/:id", userAuth, userCtrl.updateUser);
routes.delete("/:id", userCtrl.deleteUser);

module.exports = routes;