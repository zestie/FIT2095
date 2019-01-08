const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {
    getAll: function(req, res) {      // edited to solve task 6
        Actor.find({})
        .populate('movies')
        .exec(function(err, actor) {
            if (err) return res.json(err);
            if (!actor) return res.json();

            res.json(actor);
        })
    },

    getOne: function(req, res) {
        Actor.findOne({_id: req.params.id})
        .populate('movies')
        .exec(function(err, actor) {
            if (err) return res.json(err);
            if (!actor) return res.json();

            res.json(actor);
        });
    },  
    
    createOne: function(req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        console.log(newActorDetails);
        let actor = new Actor(newActorDetails);
        actor.save(function(err) {
            console.log('Done');
            res.json(actor);
        });
    },
    
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({_id: req.params.id}, req.body, function(err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });
    },

    deleteOne: function(req, res) {
        Actor.findOneAndRemove({_id: req.params.id}, function (err){
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    // new functions to solve lab tasks will be below:

    removeMovie: function(req, res) {       // solves task 2
        console.log('Actor id: ' + req.params.idA);
        console.log('Movie id: ' + req.params.idM);
        
        Actor.findOne({_id: req.params.idA}, function (err, actor) {
            console.log('entered actor find');
            if (err) return res.status(400).json(err);
            console.log('no error');
            if (!actor) return res.status(404).json();
            console.log('actor found ');
            Movie.findOne({_id: req.params.idM}, function(err, movie) {
                console.log('entered movie find');
                if (err) return res.status(400).json(err);
                console.log('no error');
                if (!movie) return res.status(404).json(err);
                console.log('movie found');
                var movieIndex = 0;
                for(var i = 0; i < actor.movies.length; i++){
                    //console.log('at index: ' + i + ', movie is: ' + actor.movies[i]);
                    console.log();
                    if (actor.movies[i] == req.params.idM){
                        movieIndex = i;
                    }
                    console.log('at index: ' + i + ', movie is: ' + actor.movies[i]);
                }
                actor.movies.splice(movieIndex,1);
                actor.save(function(err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    }

    
};