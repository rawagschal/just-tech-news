// SET UP SERVER TO COLLECT/TEST API ROUTES 
// separate from models/index.js to keep API endpoints organized and scalable

const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// prefix the routes with corresponding endpoints
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;