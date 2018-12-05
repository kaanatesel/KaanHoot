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

router.post('/findByUserName', (req, res) => {
    const username = req.body.username
    const promise = User.findOne({ username: username })

    promise.then(response => {
        res.send(response)
    }).catch(err => {
        res.send(err)
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

router.put('/resultUpdata', (req, res) => {
    const userName = req.body.username
    const totalPoint = req.body.point

    const promise = User.findOneAndUpdate({ username: userName }, { $set: { point: totalPoint } }, { new: true })

    promise.then(response => {
        res.send(response)
    }).catch(err => {
        res.send(err)
    })

})

router.post('/findMany2', (req, res) => {
    const activeUsers = req.body.usernames
    console.log('req.body.usernames')
    console.log(req.body)
    console.log(req.body.usernames)
    // const activeUsers = ["cafbavcx", "cdasfbavcx"]

    const promise = User.find({ username: activeUsers })

    promise.then(response => {
        res.send(response)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router;