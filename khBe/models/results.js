const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Results = new Schema({
    username : {
        type: String,
    },
    point:{
        type: Number
    },
    answers:[{
        corretAnswers:Number,
        wrongAnswers:Number,
    }],
})


module.exports = mongoose.model('result',Results)