const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost:27017/movies', function(err) {
    if(err){
        return console.log('Mongoose - connection error: ', err);
    }
    console.log('Connected Successfully');
});

// actor restful endpoints
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

// movie restful endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

// more endpoints to solve lab tasks will appear below:

app.delete('/movies/:id', movies.deleteOne); // task 1
app.put('/actors/:idA/:idM', actors.removeMovie); // task 2
app.put('/movies/:idM/:idA', movies.removeActor); // task 3
app.post('/movies/:id/actors', movies.addActor); // task 4
app.get('/movies/:year1/:year2', movies.filterBetween); // task 5