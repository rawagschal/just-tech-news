// ROUTES TO WORK WITH USER MODEL TO PERFOM CRUD OPS USING express.js
const router = require('express').Router();
const { User, Post, Comment, Vote } = require('../../models');
const bodyParser = require('body-parser');

// use body-parser middleware to parse req.body
router.use(bodyParser.json());

// GET all users
router.get('/', (req, res) => {
    //access User model and run .findAll() method from sequelize Model class
    // findAll() is the same as SELECT * FROM users; in SQL
    User.findAll({
        // safeguard passwords from get requests
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one user by id
router.get('/:id', (req, res) => {
    // find only one user thats id value = whatever req.params.id is
    // findOne() is the same as SELECT * FROM users WHERE id = 1 in SQL
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id','title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            { //receive post title info for queried user
                model: Post,
                attributes: [ 'title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
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
    console.log(req.body);
    //expects {username,: 'Learntino', email: 'learntino@gmail.com', password: 'password1234'}
    User.create({
    //use sequelize create() method to insert data
    // with key/value pairs defined in the User.js model and values from req.body
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        
        .then(dbUserData => {
            //access session info
            //use save() callback to respond once session is created
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
    
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//add login POST route
router.post('/login', (req, res) => {
    // query User table using findOne() method using user-entered email 
    User.findOne({
        where: {
            //assign it to req.body.email
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            //if user w/ entered email is not found, return the following 
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        
        //verify user
            //store checkPassword() boolean value for successful or failed pw check as validPassword
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            //declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// update user by id
router.put('/:id', (req, res) => {
    //expects {username,: 'Learntino', email: 'learntino@gmail.com', password: 'password1234'}
    //if req.body has exact key/value pairs to match model, just use req.body instead
    User.update(req.body, {
        individualHooks: true,
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

// delete user by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
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

//logout

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            //status code 204 = no content
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }

});

module.exports = router;