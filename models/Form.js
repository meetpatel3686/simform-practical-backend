const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Question = require('./Question');
const Survey = require('./Survey');

const Form =  sequelize.define('Form', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
    },
    responses:{
        type:DataTypes.VIRTUAL(DataTypes.INTEGER)
    }
}, {});

Form.QuestionsAssociation = Form.hasMany(Question, {as:'questions'});
Form.SurveyAssociation  = Form.hasMany(Survey, {as:'surveys'});
Question.belongsTo(Form);

module.exports = Form;