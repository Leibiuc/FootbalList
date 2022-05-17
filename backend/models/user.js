const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const userSchema = new Schema({
    user_details: {
        username:{
            type: String,
            required: true,
        },
        email: {
            type: String, 
            required: true,
        },

        password: {
            type:String, 
        },
        phoneNumber: {
            type: String, 
            required: true
        },
        lastName: {
            type: String 
        },
        firstName: {
            type: String
        },        
        dateOfBirth: {
            type: Date, 
            required: true,
        },
        image: {
            type: String,
        },
        location: {
            longitude: {
                type: String,
                required: true,
            },
            latitude: {
                type: String,
                required: true,
            },
            country:{
                type: String
            },
            county:{
                type: String
            },
            city: {
                type: String
            },
            address: {
                type: String
            },
        },
    },
    user_role: {
        type:String,
        required: true,
    },
    token: {
        type:String,
    },
    isLoggedIn:{
        type:Boolean,
        required: true,
    },
    user_type:{
        type: Object,
        required: true,
    },
});


module.exports = mongoose.model('User', userSchema);