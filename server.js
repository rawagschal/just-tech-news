const express = require('express');
// import all routes into this file 
// so that we don't have to import multiple files for different endpoints
const routes = require('./routes');
// import connection to sequelize
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//turn on routes
app.use(routes);

//establish connection to db and server
// using .sync() mehtod to take models and connect to associated db tables
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});