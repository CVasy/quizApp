// Code  for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
//const QuizzModel = require('./models/quizz.js') ;
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 3001");
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/quizz');
console.log("Connected to Mongo Successfully!");

const quizzSchema = new mongoose.Schema({
    question: String,
    answer1:String,
    answer2:String,
    answer3:String,
    answer4:String,
    rightanswer:Number
});

const BibleQuizzModel = mongoose.model("bible", quizzSchema);
const BiologyQuizzModel = mongoose.model("biology", quizzSchema);
const MathQuizzModel = mongoose.model("math", quizzSchema);
const quest = new BiologyQuizzModel({
    question : "Cate oase sunt in corpul uman?",
    answer1:"206",
    answer2:"155",
    answer3:"311",
    answer4:"254",
    rightanswer:1,
});
quest.save();

app.get('/addData', (req, res) => {
    res.send(quest);
})
;
app.get('/getMathQuizz', (req, res) => {
    console.log(res.outputData);
    MathQuizzModel.find()
    .then(quizz => {
        res.json(quizz);
    })
    .catch(err => res.json(err));
    console.log(res.outputData);
})
app.get('/getBiologyQuizz', (req, res) => {
    console.log(res.outputData);
    BiologyQuizzModel.find()
    .then(quizz => {
        res.json(quizz);
    })
    .catch(err => res.json(err));
    console.log(res.outputData);
})
app.get('/getBibleQuizz', (req, res) => {
    console.log(res.outputData);
    BibleQuizzModel.find()
    .then(quizz => {
        res.json(quizz);
    })
    .catch(err => res.json(err));
    console.log(res.outputData);
})
app.listen(3001, () => {
    console.log("server is running");
});