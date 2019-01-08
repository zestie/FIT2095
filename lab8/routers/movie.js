var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {       // edited to solve task 7
        Movie.find({})
        .populate('actors')
        .exec(function (err, movie) {
            if (err) return res.json(err);
            if (!movie) return res.json();

            res.json(movie);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    // new functions to solve lab tasks will be below:

    deleteOne: function(req, res) {         // solves task 1
        Movie.findOneAndRemove({_id: req.params.id}, function (err){
            if (err) return res.status(400).json(err);

            res.json();
        });
    },
    removeActor: function(req, res) {       // solves task 3
        console.log('Actor id: ' + req.params.idA);
        console.log('Movie id: ' + req.params.idM);
        
        Movie.findOne({_id: req.params.idM}, function (err, movie) {
            console.log('entered movie find');
            if (err) return res.status(400).json(err);
            console.log('no error');
            if (!movie) return res.status(404).json();
            console.log('movie found ');
            Actor.findOne({_id: req.params.idA}, function(err, actor) {
                console.log('entered actor find');
                if (err) return res.status(400).json(err);
                console.log('no error');
                if (!actor) return res.status(404).json(err);
                console.log('actor found');
                var actorIndex = 0;
                for(var i = 0; i < movie.actors.length; i++){
                    //console.log('at index: ' + i + ', movie is: ' + actor.movies[i]);
                    console.log();
                    if (movie.actors[i] == req.params.idM){
                        actorIndex = i;
                    }
                    console.log('at index: ' + i + ', movie is: ' + movie.actors[i]);
                }
                movie.actors.splice(actorIndex,1);
                movie.save(function(err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    addActor: function(req, res) {          // solves task  4
        Movie.findOne({_id: req.params.id}, function (err, movie) {
            console.log('entered movie find');
            if (err) return res.status(400).json(err);
            console.log('no error');
            if (!movie) return res.status(404).json();
            console.log('movie found ');
            Actor.findOne({_id: req.body.id}, function(err, actor) {
                console.log('entered actor find');
                if (err) return res.status(400).json(err);
                console.log('no error');
                if (!actor) return res.status(404).json(err);
                console.log('actor found');
                movie.actors.push(actor._id);
                movie.save(function(err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    filterBetween: function(req, res) {     // solves task 5
        Movie.where({}).where('year').gte(req.params.year2).lte(req.params.year1).exec(function(err, docs){
            res.json(docs);
        })
    }
};