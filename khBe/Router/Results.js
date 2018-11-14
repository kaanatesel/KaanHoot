const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

//Models
const Results = require('../models/results')

router.use(express.json())


router.post('/newResults', (req, res) => {
    const { username, point, answers } = req.body

    const NewResults = new Results({
        username: username,
        point: point,
        answers
    })

    const promise = NewResults.save()

    promise.then((response) => {
        res.send(response)
        console.log(response)
    }).catch((err) => {
        s
        res.send(err)
    })
})

router.get('/allResults', (req, res) => {
    const promise = Results.find()

    promise.then((response) => {
        res.send(response)
    }).catch((err) => {
        res.send(err)
    })
})

router.put('/updateValue/:UserName', (req, res) => {
    const username = req.params.UserName
    const promise = Results.findOneAndUpdate({ "username": username } , {$inc : {point: +10}})
    promise.then((response) => {
        res.send(response)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router;