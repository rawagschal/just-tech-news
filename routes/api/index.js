// SET UP SERVER TO COLLECT/TEST API ROUTES 
// separate from models/index.js to keep API endpoints organized and scalable

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

// prefix the user-routes.js routes with /users
router.use('/users', userRoutes);

module.exports = router;