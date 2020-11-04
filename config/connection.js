//call the Sequelize connection constructor function
    //import base sequelize class
const Sequelize = require('sequelize');

    //create new cconnection to db, pass in MySQL info
const sequelize = new Sequelize('just_tech_news_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

    //export connection module
module.exports = sequelize;

