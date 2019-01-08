var mongoose = require('mongoose');


let developerSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firtName: {
            type: String,
            require: true
        },
        lastName: String
    },
    level: String,
    Due_Date: Date,
    task_Status: String,
    Desc: String 
});

//module.exports = mongoose.model('Developers', developerSchema);
mongoose.model('developersS', developerSchema); 
