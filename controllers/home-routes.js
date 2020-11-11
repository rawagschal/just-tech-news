// USER-FACING ROUTES

const router = require('express').Router();

router.get('/', (req, res) => {
    // use render() to specify template
    res.render('homepage');
});

module.exports = router;