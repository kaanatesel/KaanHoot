const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

router.use(express.json())


//Models
const User = require('../models/users')

router.post('/newUser', (req, res) => {
    const username = req.body.UserName
    const NewUser = new User({
        username: username
    })

    const promise = NewUser.save()

    promise.then(response => {
        const data = {
            status: true,
            username: username,
        }
        res.send(data)
    }).catch(err => {
        const data = {
            status: false,
        }
        console.log(err)
        res.send(data)
    })
})



router.get('/user', (req, res) => {
    const promise = User.find()
    promise.then((response) => {
        res.send(response)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router;