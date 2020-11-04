//call the Sequelize connection constructor function
    //import base sequelize class
const Sequelize = require('sequelize');

    //execute dotenv 
require('dotenv').config();

    //create new cconnection to db with data in .env 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

    //export connection module
module.exports = sequelize;

