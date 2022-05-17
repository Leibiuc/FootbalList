const Team = require('../../models/team');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createTeam = (args) => {
    const team = new Team({
        leader: args.teamInput.leader,
        teamDetails:{
            name: args.teamInput.teamDetails.name,
            creationDate: args.teamInput.teamDetails.creationDate,
            avatar: args.teamInput.teamDetails.avatar,
            location: {
                longitude: args.teamInput.teamDetails.location.longitude,
                latitude: args.teamInput.teamDetails.location.latitude,
                country: args.teamInput.teamDetails.location.country,
                county: args.teamInput.teamDetails.location.county,
                city: args.teamInput.teamDetails.location.city,
                address: args.teamInput.teamDetails.location.address,
            }
        },
    });
    return team
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.addPlayer = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.addPlayerInput._id)){
            existingTeam = await Team.findOne({'_id' : args.addPlayerInput._id})
            if(existingTeam !== undefined && existingTeam !== null)
            {
                if(ObjectId.isValid(args.addPlayerInput.playerId)){
                    if(existingTeam.players.includes(args.addPlayerInput.playerId))
                        return "Player already in the team!";
                    if(existingTeam.players.length > 4)
                        return "Too many players in the team!";
                    existingTeam.players.push(args.addPlayerInput.playerId);

                    await existingTeam.save();
                    return "Player added successfuly!";
                }
                return "Not a valid player ID!"
            }
            return "Team not found!";
        }
    return "Not a valid team ID!";

    } catch(err){
        console.log(err)
        return err;
    }
};

exports.sendTeamMessage = async(args) =>{
    let existingTeam;
    try{
        if(ObjectId.isValid(args.messageInput._id)){
            existingTeam = await Team.findById(args.messageInput._id);
            if(existingTeam !== undefined && existingTeam !== null)
            {
                let message = {
                    user_id: args.messageInput.user_id,
                    message: args.messageInput.message,

                };
                console.log(typeof( existingTeam.chat.messages))
                existingTeam.chat.messages.push(message);
                await existingTeam.save();
                return "Message send successfuly!";
            }
            return "Team not found!";}
        return "Not a valid team ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.deleteTeam = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args._id)){
            existingTeam = await Team.findOne({'_id' : args._id});
            if(existingTeam !== undefined && existingTeam !== null)
            {
                await existingTeam.remove();
                return "Team removed!";
            }
            return "Team not found!";
            }
        return "Not a vlaid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.removePlayerFromTeam = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.removePlayerFromTeam.id_team)){
            existingTeam = await Team.findById(args.removePlayerFromTeam.id_team);
            if(existingTeam !== undefined && existingTeam !== null){
                if(ObjectId.isValid(args.id_player)){

                    existingTeam.players.pull(args.removePlayerFromTeam.id_player);
                    await existingTeam.save();

                    return "Team updated!";
                }
            return "Not a valid player ID!";
        }
            return("The team does not exist");}
        return "Not a valid team ID!";
    }catch(err)
    {
        console.log(err);
        return err;
    }
}

exports.swapLeader = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.removePlayerFromTeam.id_team)){
            existingTeam = await Team.findById(args.removePlayerFromTeam.id_team);
            if(existingTeam !== undefined && existingTeam !== null)
            {
                const leader = existingTeam.leader;

                existingTeam.leader = args.removePlayerFromTeam.id_player;
                existingTeam.players.pull(args.removePlayerFromTeam.id_player);
                existingTeam.players.push(leader);

                await existingTeam.save();

                return "Team updated!";
            }
            return "Team does not exist!";}
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.clearTeamChat = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.team_id)){
            existingTeam = await Team.findById(args.team_id);
            if(existingTeam !== undefined && existingTeam !== null)
            {
                existingTeam.chat.messages = [];
                await existingTeam.save();

                return "Chat deleted";
            }
            return "Team does not exist!";}
        return  "Not a valid ID!"
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.clearGallery = async(args) => {
    let existingTeam;
    try{

        if(ObjectId.isValid(args.team_id)){
            existingTeam = await Team.findById(args.team_id);
            if(existingTeam !== undefined && existingTeam !== null){
                existingTeam.teamGallery = [];
                await existingTeam.save();

                return "Gallery deleted!";
            }
        return "Team does not exist!";
    }return "Not a valid ID!"
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getTeamByID = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.team_id)){
            existingTeam = await Team.findById(args.team_id);
            return existingTeam;
            }
        return null;
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getTeamByOwner = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.leader_id)){
            existingTeam = await Team.findOne({leader : args.leader_id});
            return existingTeam;
        }
        return null;
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.setTeamChampionship = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.updateChampionship.team_id)){
            existingTeam = await Team.findById(args.updateChampionship.team_id);
            if(existingTeam !== null && existingTeam !== undefined){
                existingTeam.championship = args.updateChampionship.championship;
                await existingTeam.save();
                return "Championship updated!";
            }
            return "Team not found!";}
        return "Not a valid ID!"
    }catch(err){
        console.log(err)
        return err;
    }
}

exports.updateRating = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.updateRating.team_id)){
            existingTeam = await Team.findById(args.updateRating.team_id);

            existingTeam.teamDetails.rating = args.updateRating.stars;

            await existingTeam.save();

            return "Rating updated!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}


exports.addAchivement = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.addAchivement.team_id)){
            existingTeam = await Team.findById(args.addAchivement.team_id);

            existingTeam.teamAchivements.push(args.addAchivement.achivement);

            await existingTeam.save();

            return "Achivement updated!";

        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.updateAchivement = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.updateAchivement.team_id))
        {
            existingTeam = await Team.findById(args.updateAchivement.team_id);

            existingTeam.teamAchivements = existingTeam.teamAchivements.map((achivement) => {
                if(args.updateAchivement.achivement_id.toString() === achivement._id.toString()){
                    if(achivement.progress + args.updateAchivement.progress < achivement.goal)
                        achivement.progress = achivement.progress + args.updateAchivement.progress;
                    else
                        achivement.progress = achivement.goal
                }
                return achivement;
            });

            await existingTeam.save();

            return "Achivement updated!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.addPhotoToGallery = async(args) => {
    let existingTeam;
    try{
        if(ObjectId.isValid(args.addPhoto.team_id)){
            existingTeam = await Team.findById(args.addPhoto.team_id);
            if(existingTeam !== null && existingTeam !== undefined){
                existingTeam.teamGallery.push(args.addPhoto.photo);
                await existingTeam.save();
                return "Photo added!";
            }
            return "Team not found!";
    }
    return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }

}

exports.deletePhotofromGallery = async(args) => {
    let existingTeam;
    console.log(args)
    try{
        if(ObjectId.isValid(args.deletePhoto.team_id)){
            existingTeam = await Team.findById(args.deletePhoto.team_id);
            if(existingTeam !== null && existingTeam !== undefined)
            {
                existingTeam.teamGallery.pull(args.deletePhoto.photo);

                await existingTeam.save();

                return "Photo deleted!";
            }
            return "Team not found!"
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}