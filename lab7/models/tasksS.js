var mongoose = require('mongoose');


let taskSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    assign_To: {type: mongoose.Schema.Types.ObjectId, ref: 'developersS'},
    Due_Date: {type: Date},
    task_Status: {type: String},
    Desc: {type: String
    },
});

//module.exports = mongoose.model('Tasks', taskSchema);
mongoose.model('taksS', taskSchema); 


