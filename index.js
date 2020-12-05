require('dotenv').config();
const express = require("express");
const cors = require("cors");
const formRouter = require("./routes/form.js");
const Sequelize = require("sequelize");
const Form = require("./models/Form");
const Question = require("./models/Question");
const Survey = require('./models/Survey');

Form.sync().catch(error => console.error("ERROR : ", error)); 
Question.sync().catch(error => console.error("ERROR : ", error));  
Survey.sync().catch(error => console.error("ERROR : ", error));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/form", formRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on : ${port}`);
});

