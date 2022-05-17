const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema ({
    leader:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    players:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    teamDetails: {
        name:{
            type: String,
            required: true,
        },
        creationDate: {
            type: Date,
            required: true,
        },
        avatar: {
            type: String,
            
        },
        rating: {
            stars: [{
                type: String
            }],
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
        }
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
    teamGallery: [{
        type: String,
    }],
    championship:{
        type: String,
    },
    teamAchivements:[{
        name: { 
            type: String,
            required: true,
        },
        image: { 
            type: String,
        },
        date: { 
            type: String,
        },
        role: { 
            type: String,
        },
        goal: { 
            type: Number,
            required: true,
        },
        progress: { 
            type: Number,
        },
        reward: {
            type: String,
            required: true,
        },
    }],
})


module.exports = mongoose.model('Team',teamSchema);