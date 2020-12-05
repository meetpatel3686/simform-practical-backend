const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Form = require('./Form');

const Survey =  sequelize.define('Survey', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    formData:{
        type: DataTypes.JSON,
        allowNull: false
    }
}, {});

module.exports = Survey;