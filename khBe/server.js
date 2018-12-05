const express = require('express')
const app = express()
const router = express.Router();
const mongoose = require('mongoose');

const cookie = require('cookie');


const io = require('socket.io')(5000);


mongoose.connect('mongodb://ateselboy:Malmert31@ds141221.mlab.com:41221/kaanhoot', { useNewUrlParser: true });

mongoose.connection.on('open', () => {
    console.log("connected to db")
})

mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (error) => {
    console.log('can not connecet to db')
    console.log(error)
})

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//Routers
const Users = require('./Router/Users')
const Questions = require('./Router/Questions')
const Results = require('./Router/Results')


//App.Use
app.use('/users', Users)
app.use('/questions', Questions)
app.use('/results', Results)

app.use(express.json())

app.post('/check', (req, res) => {
    res.send(200, 'adefads')
})



//SOKET IO
let users = {}
let activeUsers = {}
let remainingUser = []
let chatMessages = []
let results = []
let readyUsersNumber = 0
io.on('connection', (socket) => {
    console.log('new user get in ' + socket.id)

    socket.on('username', (data) => {
        const onlineUsers = {
            username: data.username,
            id: data.id,
            point: 0,
        }

        remainingUser.push(onlineUsers)
        io.emit('username', remainingUser)

    })

    socket.on('newEntry', (data) => {
        const defoultData = {
            id: socket.id,
            point: 0
        }
        const userEntryData = Object.assign(defoultData, data)
        users[data.username] = userEntryData
        io.emit('users', users)
    })

    socket.on('chat', (msg) => {
        chatMessages.push(msg)
        io.emit('chat', chatMessages)
    })

    socket.on('ready', (readyStatus) => {
        if (readyUsersNumber <= 0) {
            readyUsersNumber = 0;
        }
        if (readyStatus) {
            readyUsersNumber = readyUsersNumber + 1
        } else {
            readyUsersNumber = readyUsersNumber - 1
        }
        if (readyUsersNumber === remainingUser.length && readyUsersNumber >= 2) {

            io.emit('ready', true)
            setTimeout(function () {
                io.emit('questionPageData', remainingUser)
                console.log(remainingUser)

            }, 2000)
            //io.emit('questionPageData', remainingUser)
            console.log('go')

            readyUsersNumber = 0
        } else {
            io.emit('ready', false)
            console.log('user ' + remainingUser.length)
            console.log('ready user  ' + readyUsersNumber)
        }
    })

    socket.on('resultsRequest', (data) => {
        let resultsName = data

        results.push(resultsName)
        io.emit('resultsRequest2', results)
    })

    socket.on('cleanFornew', (data) => {
        if (data === true) {
            users = {}
            activeUsers = {}
            remainingUser = []
            chatMessages = []
            results = []
            readyUsersNumber = 0
        }

    })

    socket.on('disconnect', () => {
        console.log(activeUsers)
        for (let i = 0; i < remainingUser.length; i++) {
            console.log('-----')
            console.log(remainingUser)
            if (socket.id == remainingUser[i].id) {
                remainingUser.splice(i, 1)
                console.log('-----2')
                console.log(remainingUser)
                io.emit('username', remainingUser)
            } else {
                console.log('olmadı')
            }
        }
    });
})


app.listen(8080, () => {
    console.log("This app listen port 8080");
})