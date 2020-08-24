const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello from nodemon');
})

routes.post('/register', UserController.store)

module.exports = routes;