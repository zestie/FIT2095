const mongoose = require('mongoose');
const actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    bYear: {
        validate: {
            validator: Number.isInteger,
            message: 'Birth year must be an integer'
        },
        type: Number,
        required: true
        },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

module.exports = mongoose.model('Actor', actorSchema);

