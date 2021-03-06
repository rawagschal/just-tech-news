//USER DATA MODEL FILE

//import bcrypt
const bcrypt = require('bcrypt');
//import model class and dataTypes object from sequelize
const { Model, DataTypes } = require('sequelize');
//import sequelize from this path
const sequelize = require('../config/connection');

//create User class to inherit all Model class functionality
class User extends Model {
    //set up method to run on instance data (per user) to check pwd
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//initialize User model's data and configuration by passing in 2 objects as arguments
User.init(
    { //table column definitions as first argument object
        //define id column
        id: {
            //use sequelize DataTypes object 
            type: DataTypes.INTEGER,
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey: true,
            //turn on auto-increment
            autoIncrement: true,
        },
        //define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //don't allow duplicate emails
            unique: true,
            //validate data prior to creating table as long as allowNull: false
            validate: {
                //will check for a true email address
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //password must be > 4 characters long
                len: [4]
            }
        }
    },
    {//table config options as second argument (https://sequelize.org/v5/manual/models-definition.html#configuration))
        //add sequelize hook functions here
        hooks: {
            //use async beforeCreate() hook to fire prior to new User creation
            async beforeCreate(newUserData) {
                //execute bcrypt hash function w/saltRound val of 10, using async/await syntax
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //use async beforeUpdate() hook to fire prior to updating User info
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        //pass in imported sequelize connection (direct connection to db from connection.js)
        sequelize,
        //don't auto-create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of db table
        freezeTableName: true,
        //use underscores instead of camel-casing
        underscored: true,
        //make it so the model name stays lowercase in the db
        modelName: 'user'
    }
);

//export module
module.exports = User;