const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('common'));
app.listen(8080);

const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017/";

let db;

MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("fit2095db");
        }
    }
);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/newTask', function (req, res) {
    res.sendFile(__dirname + '/views/newTask.html');
});

app.post('/newTask', function (req, res) {
    let taskDetails = req.body;
    let newId = Math.round(Math.random()*100);
    db.collection('tasks').insertOne({ id: newId, taskName: taskDetails.tname, assignTo: taskDetails.assto, taskDue: taskDetails.tdue, taskStatus: taskDetails.tstatus, taskDesc: taskDetails.tdesc});
    res.redirect('/listTask');
});

app.get('/listTask', function (req, res) {
    db.collection('tasks').find({}).toArray(function (err, data) {
        res.render('listTask', { taskDb: data });
    });
});

app.get('/updateTask', function (req, res) {
    res.sendFile(__dirname + '/views/updateTask.html');
});

app.post('/updatetaskdata', function (req, res) {
    let taskDetails = req.body;
    let filter = {id: parseInt(taskDetails.taskId)};
    let theUpdate = { $set: { taskStatus: taskDetails.newtstatus} };
    db.collection('tasks').updateOne(filter, theUpdate);
    res.redirect('/listTask');
})

app.get('/deleteTask', function (req, res) {
    res.sendFile(__dirname + '/views/deleteTask.html');
});

app.post('/deletetaskdata', function (req, res) {
    let taskDetails = req.body;
    let filter = { id: parseInt(taskDetails.taskID) };
    db.collection('tasks').deleteOne(filter);
    res.redirect('/listTask');
});

app.post('/deleteAll', function (req, res) {
    db.collection("tasks").deleteMany({taskStatus: { $eq: 'Complete' }}, function (err, obj) {
    res.redirect('/listTask');
    })
});