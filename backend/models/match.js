const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchSchema = new Schema({


    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    participants: {
            type: Object,
            },
    matchDetails: {
        credit: {
            type: Number,
            required: true,
        },
        appointment: {
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
        },
        field: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        playersNumber: {type: Number, default:12, required: true},
        needsRef: {type: Boolean, default: false}
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
    mediaGallery: [{
        type: String
    }],
    matchStatistics: {
        goalsScored: {type: Number,},
        nameOrganizer: {type: String},
        tokensSpent: {type: Number}
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    public:{
        type: Boolean,
        default: true
    },
    minParticipants: {
        type: Number,
        default: 8
    }
    
})

module.exports = mongoose.model('Match',matchSchema);