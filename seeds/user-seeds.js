const { User } = require('../models');

const userdata = [
    {
        username: 'meatz1',
        email: 'meatz@gmail.com',
        password: 'password101'
    },
    {
        username: 'meatz2',
        email: 'meatz@aol.com',
        password: 'password102'
    },
    {
        username: 'meatz3',
        email: 'meatz@yahoo.com',
        password: 'password103'
    },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true, returning: true });

module.exports = seedUsers;