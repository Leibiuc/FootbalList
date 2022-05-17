const Match = require('../../models/match');

exports.matches = () =>  {
    return Match
        .find()
        .then(matches => {
            return matches.map(match => {
                return{...match._doc, _id: match._doc._id.toString()};
            });
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

exports.getMatchByID = async(args) => {
    let existingMatch = null;
    try{
        existingMatch = await Match.findById(args._id);
        if(existingMatch !== undefined && existingMatch !== null){
            
            if(existingMatch.matchDetails.appointment.end < Date.now()){
            existingMatch.status = false
            await existingMatch.save();
            }
            return existingMatch;
        }
    }catch(err){
        console.log(err);
        return(err);
    }
};


