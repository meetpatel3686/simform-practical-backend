const express = require("express");
const router = express.Router();
const Form = require('../models/Form');
const Survey = require('../models/Survey')
const {nanoid} = require('nanoid');
const frontendUrl = require('../config/frontend-url');

router.post("/", async (req, res) => {
    try {
        const id=nanoid(11);
        const formObject = {id, ...req.body, url:`${frontendUrl}/form/${id}`};
        const form = await Form.create(formObject, {include:[{association: Form.QuestionsAssociation, as:'questions'}]});
        return res.status(200).send(form);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post("/submit", async (req, res) => {
    try {
        const {formId, formData} = req.body;
        const survey = await Survey.create({formData, FormId:formId});
        return res.status(200).send({survey, message:"Form successfully submited."});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const formObject = req.body;
        const forms = await Form.findAll({include:[{association: Form.QuestionsAssociation, as:'questions'}]});
        for (let form of forms) {
              form.responses = await Survey.count({
                where: { FormId: form.id }
              });
            }
        return res.status(200).send(forms);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const formObject = req.body;
        const form = await Form.findByPk(req.params.id, {include:[{association: Form.QuestionsAssociation, as:'questions'}]});
        if(!form) return res.status(404).send({error:"Form not found"});
        return res.status(200).send(form);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router;