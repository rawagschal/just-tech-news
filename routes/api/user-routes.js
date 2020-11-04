// ROUTES TO WORK WITH USER MODEL TO PERFOM CRUD OPS USING express.js

const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    //access User model and run .findAll() method from sequelize Model class
    User.findAll()
    // findAll() is the same as SELECT * FROM users; in SQL
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
    // find only one user thats id value = whatever req.params.id is
    // findOne() is the same as SELECT * FROM users WHERE id = 1 in SQL
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                //404 status code means all is well, but a nonexistent id value was entered
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



// POST /api/users
router.post('/', (req, res) => {
    console.log('post route hit');
    //expects {username,: 'Learntino', email: 'learntino@gmail.com', password: 'password1234'}
    User.create({
    //use sequelize create() method to insert data
    // with key/value pairs defined in the User.js model and values from req.body
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        console.log(req.body)
        console.log(req)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    //expects {username,: 'Learntino', email: 'learntino@gmail.com', password: 'password1234'}

    //if req.body has exact key/value pairs to match model, just use req.body instead
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: ' No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;