const express = require("express"); 
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongodb = require("mongodb");
var fs = require('fs');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.listen(8080);
console.log('server has started');

app.use(express.static('images'))
app.use(express.static('CSS'))
app.engine('html', require('ejs').renderFile);
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

fs.readdirSync(__dirname + '/models').forEach(function(filename){
if(~filename.indexOf('.js')) require(__dirname + '/models' + '/'+ filename)
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDB2');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log(" Mongoose Connection Successful!");
});

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/myDB2';

MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("myDB2");
        }
    }
);

mongoose.connect("mongodb://localhost:27017/myDB2", { useNewUrlParser: true } ,function (err) {
    if (err) 
    {
        console.log('Error in Mongoose connection');
        throw err;
    } else {
        const Task = require('./models/tasksS.js');
        const Developer = require('./models/developersS.js');

    mongoose.model('Developers', {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            firstName: {type: String, required: true},
            lastName: String
        },
        assign_To: String,
        Due_Date: Date,
        task_Status: String,
        Desc: String
    });
    mongoose.model('Tasks', { _id: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: true},
        assign_To: {type: mongoose.Schema.Types.ObjectId, ref: 'developersS'},
        Due_Date: {type: Date},
        task_Status: {type: String},
        Desc: {type: String}
    });
   
   //add new task page
   app.get('/', function (req, res) {
       res.render('indexw4.html', {username: "Hello User"});
   });
   
    app.get('/addTask', function (req, res) {
    mongoose.model('Tasks').find(function(err, Tasks) {
        res.render('addTask.html', {username: "User", myDB2: db});
   });
});
   
   
   app.get('/listTasks', function (req, res) {
       db.collection('Tasks').find({}).toArray(function (err, data) {
           res.render('listTasks', { myDB2: data });
       });
   });
   
   app.get('/deleteTask', function (req, res) {
       res.render('deleteTask.html', { myDB2: db });;
   });
   
   app.get('/addDeveloper', function (req, res) {
    mongoose.model('Developers').find(function(err, Developers) {
       res.render('addDeveloper.html',  {username: "User", myDB2: db});
   });
}); 
   
   app.get('/listDevelopers', function (req, res) {
       db.collection('Developers').find({}).toArray(function (err, data) {
           res.render('listDevelopers.html', { myDB2: data });
       });
   });
   
   
   
   app.get('/deleteAll', function (req, res) 
   {
       res.render('deleteAll', { myDB2: db});;
   });
   
   app.get('/updateTask', function (req, res) {
       res.render('updateTask', { myDB2: db });;
   });
   
   //POST request: receive the tasks id and do the delete operation
   app.post('/deleteTaskData', function (req, res) {
        db.collection('Tasks').deleteOne({_id: mongodb.ObjectID(req.body.id)},
        (err, result) => {
           if (err) return console.log(err)
           res.redirect('/listTasks'); })
   });

   app.post('/deleteCompTasks', function (req, res) {
       //let answer = req.body.id1;
        db.collection('Tasks').deleteMany({'task_Status':'Complete'}, function(err, doc) { 
            console.log("Tasks deleted successfully");
            res.redirect('/listTasks');
        });      
   });

   app.post('/addTask', function (req, res) {
        let name1 = req.body.name;
        let date1 = req.body.date;
        let desc1 = req.body.desc;
        let assign1 = req.body.assign;
        let stat1 = req.body.status;
        var task1 = {
            name: name1,
            assign_To: assign1,
            Due_Date: date1,
            task_Status: stat1,
            Desc: desc1 
        };
        db.collection('Tasks').insertOne(task1);
        res.redirect('/listTasks'); // redirect the client to list users page
   });
   
   // add developer
   app.post('/addDeveloper', function (req, res)    {
        let fName = req.body.firstName;
        let sName = req.body.secondName;
        let level1 = req.body.level;
        let state1 = req.body.state;
        let suburb1 = req.body.suburb;
        let street1 = req.body.street;
        let unit1 = req.body.unit;

        var developer1 = {
            name: {
                FirstName: fName,
                SecondName: sName,
            },
            Level: level1, 
            State: state1,
            Suburb: suburb1,
            Street: street1,
            Unit: unit1
        };
        db.collection('Developers').insertOne(developer1);   
        res.redirect('/listDevelopers');
   });

   app.post('/updateTaskData', function (req, res) 
   {
       let taskiD1 = req.body.taskId;
       let newTask1 = req.body.newTask;
       db.collection("Tasks").updateOne({ "_id": mongodb.ObjectID(taskiD1)}, { $set: {"task_Status": newTask1} }, { upsert: true }, function (err, result) {
       });
       res.redirect('/listTasks');
    })
    
    }})
