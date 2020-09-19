const express = require('express');
const verifyToken = require('./config/verifyToken');
const multer = require('multer');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController');
const uploadConfig = require('./config/upload');
const LoginController = require('./controllers/LoginController');
const Registration = require('./models/Registration');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/status', (req, res) => {
    res.send({ status: 200 });
});

// Login
routes.post('/login', LoginController.store);

// Registration
routes.post('/registration/:eventId', RegistrationController)

// Dashboard
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents);
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents);
routes.get('/user/events', verifyToken, DashboardController.getAllEventsByUserId);
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById);

// Event 
routes.post('/event', verifyToken, upload.single('thumbnail'), EventController.createEvent);
routes.delete('/event/:eventId', verifyToken, EventController.delete)

// User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;