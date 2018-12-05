const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

//Models
const Questions = require('../models/questions')

router.use(express.json())

router.post('/newQuestion', (req, res) => {
    const { questionId, question, answers, correctAnswer } = req.body
    const newQuestions = new Questions({
        questionId,
        question,
        answers,
        correctAnswer
    })
    const promise = newQuestions.save()
    promise.then((response) => {
        res.send(response)
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/getOneQuestion/:questionID', (req, res) => {
    const promise = Questions.findOne({questionId:req.params.questionID})
    promise.then((response) => {
        res.send(response)
    }).catch((err) => { 
        res.send(err)
    })
})

router.get('/questions', (req, res) => {
    const promise = Questions.find()
    promise.then((questions) => {
        res.send(questions)
    }).catch((err) => {
        res.send(err)
    })
})


module.exports = router;