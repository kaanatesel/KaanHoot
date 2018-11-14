const express = require('express')
const app = express()
const router = express.Router();
const mongoose = require('mongoose');

const cookie = require('cookie');


const io = require('socket.io')(5000);

mongoose.connect('mongodb://192.168.99.100:32768/kahoot', { useNewUrlParser: true });

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
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       io.emit('chat message', msg);
//     });
//   });
let activeUsers = []

io.on('connection', (socket) => {
    console.log('new user get in ')
    socket.join('newuser')

    socket.on('username',(data)=>{
        activeUsers.push(data)
        const activeUserJSON = {activeUsers}
        io.emit('username',activeUserJSON)
    })
    

    socket.on('disconnect', () => {
       for(let i = 0 ; i < activeUsers.length ; i++){
           console.log('This is left ' + socket.id)
       if(socket.id === activeUsers[i].id){
           activeUsers.splice(i, 1)
           console.log(activeUsers)
           let remainingUsers = {activeUsers}
           io.emit('username',remainingUsers)
       }

       }
    });

})  


app.listen(8080, () => {
    console.log("This app listen port 8080");
})