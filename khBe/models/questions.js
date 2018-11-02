const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newQuestion = new Schema({
    questionId : {
        type: Number,
    },
    question:{
        type:String,
    },
    answers:[{
        A:String,
        B:String,
        C:String,
        D:String,
    }],
    correctAnswer:{
        type:String
    }

})

 
module.exports = mongoose.model('question',newQuestion)