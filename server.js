// import public folder
const path = require('path');

const express = require('express');
const app = express();

const routes = require('./controllers');

// import connection to sequelize
const sequelize = require('./config/connection');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// import handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use expres.static() middleware method to serve contents of /public as static assets
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//establish connection to db and server
// using .sync() mehtod to take models and connect to associated db tables
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});