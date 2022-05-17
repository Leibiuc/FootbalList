const Team = require('../../models/team');

exports.teams = () =>  {
    return Team
        .find()
        .then(teams => {
            return teams.map(team => {
                return{...team._doc, _id: team._doc._id.toString()};
            });
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

exports.getTeamByID = async(args) => {
    let existingTeam = null;
    try{
        existingTeam = await Team.findById(args._id);
        if(existingTeam !== undefined && existingTeam !== null)
        return existingTeam;
        
    }catch(err){
        console.log(err);
        return(err);
    }
};