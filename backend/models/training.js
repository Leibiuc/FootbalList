const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const trainingSchema = new Schema ({

    name: {
        type: String,
        required: true,
    },
    trainer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        longitude: {
            type: String, 
        },
        latitude: {
            type: String,
        },
        country: {
            type: String,
        },
        county: {
            type: String,
        },
        city: {
            type: String,
        },
        address: {
            type: String, 
        }
    },
    field: {
        type: Schema.Types.ObjectId,
        ref: 'Field',
        required: true,
    },
    duration : {
        start: {
            type: Date,
        },
        end: {
            type: Date,
        },
        totalDays: {
            type: Number
        }
    },
    trainees: [{
        traineeID:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status:{
            type: Boolean,
            required: true
        },
        ratings:{
            technique:{type : Number},
            physical:{type: Number}
        },
        feedback:{type: String}
        
    }],
    description: {
        type: String,
        
    },
    chat: {
        name: {
            type: String,
            required: true,
        },
        messages:[{
            user_id: {
                type: String,
                
            },
            message: {
                type: String,
               
            }
        }] 
    },

});


module.exports = mongoose.model('Training',trainingSchema);