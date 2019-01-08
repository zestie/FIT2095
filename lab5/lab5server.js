let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');

let app = express();

app.engine('html', require('ejs').renderFile);
app.set('add Task', 'html');
app.use(express.static('images'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

let db = [];
db.push({
    tName: 'Task 1',
    tDue: '7/9/2018',
    tDesc: 'Build new Module'
});
db.push({
    tName: 'Task 2',
    tDue: '10/11/2018',
    tDesc: 'Perform unit tests'
});
db.push({
    tName: 'Task 1',
    tDue: '11/12/2018',
    tDesc: 'Deploy to production servers'
});

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/listTask', function (req, res) {
    res.render('listTask.html',{lab5Db: db});
});

app.get('/newtask', function (req, res) {
    res.render('newtask.html');
});

app.post('/newtask', function (req, res) {
    console.log(req.body.tName);
    console.log(req.body.tDue);
    console.log(req.body.tDesc);
    db.push({
        tName: req.body.tName,      
        tDue: req.body.tDue,
        tDesc: req.body.tDesc
    });

});
app.listen(8080);