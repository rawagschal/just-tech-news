// COLLECT PACKAGED API ROUTES FROM routes/api subdirectory

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

//prefix routes from all files in controllers/api
router.use('/api', apiRoutes);

//prefix home routes
router.use('/', homeRoutes);

//return 404 error for a nonexistent endpoint (RESTful practice)
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;