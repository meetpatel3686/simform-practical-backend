const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Form = require('./Form');

const Question =  sequelize.define('Question', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    options:{
        type: DataTypes.JSON
    }
}, {});

module.exports = Question;