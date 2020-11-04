// COLLECT PACKAGED API ROUTES FROM routes/api subdirectory

const router = require('express').Router();

const apiRoutes = require('./api');

//prefix routes from both files in routes/api
router.use('/api', apiRoutes);

//return 404 error for a nonexistent endpoint (RESTful practice)
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;