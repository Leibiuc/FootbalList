const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const fieldSchema = new Schema ({

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
    fieldAdministrator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fieldPage: {
        name: {type: String, required: true},
        profileImage: {type: String},
        gallery: {type: Array},
        review:[{
            value: {type: Number, required: true},
            user:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {type: Date},
            details: {type: String} 
        }],
        rating: {type: Number, required: true, default:0},
        price: {
            generalPrice:{type: Number, required: true},
            customPrices:{type: Array}
        },
        facilities: {type: Array, required: true},
        description: {type: String},
        posts: {type: Array}
    },
    matchDetails: {
        type: String,
        required: true,
    },
    disponibility: {
        appointments:{type: Array},
        advanceMoney:{type: Number}
    },
    services: {
        type: Array, default: []
    },
    statistics:{
        playersNumber:{type: Number, required: true, default: 0},
        matchesNumber:{type: Number, required: true, default: 0},
        players:{type: Array, required: true, default: []}
    }

});


module.exports = mongoose.model('Field',fieldSchema);