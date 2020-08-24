const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

routes.get('/status', (req, res) => {
    res.send({ status: 200 });
})

routes.get('/user/register', (req, res) => {
    res.send('Hello from register');
})

routes.post('/register', UserController.store)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes;