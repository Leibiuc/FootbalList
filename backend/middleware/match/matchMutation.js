const Match = require("../../models/match");
const ObjectId = require('mongoose').Types.ObjectId;

exports.createMatchWithLobbyTeams = async(args) => {
    const match = new Match({
        creator:args.matchInput.creator, 
        participants:{
            team1Players:[],
            team2Players:[]
        },
        matchDetails:{
            credit: args.matchInput.matchDetails.credit,  
            appointment: {
                day: new Date(args.matchInput.matchDetails.appointment.day),
                start: new Date(args.matchInput.matchDetails.appointment.start),
                end: new Date(args.matchInput.matchDetails.appointment.end)
            },
            field: args.matchInput.matchDetails.field,
            playersNumber: args.matchInput.matchDetails.playersNumber,
            needsRef: args.matchInput.matchDetails.needsRef
        },
        chat:{
            name: "Match chat",
            messages:[]
        },
        public: args.matchInput.public,
        minParticipants: args.matchInput.minParticipants
        
    });
    match.participants.team1Players.push(args.matchInput.creator);
    return match
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.createMatchWithPreSelectedTeams = async(args) => {
    const match = new Match({
        creator:args.matchInput.creator, 
        participants:{
            firstTeam:{
                teamID: args.matchInput.participants.firstTeam.teamID,
                
            },
            secondTeam:{
                teamID: args.matchInput.participants.secondTeam.teamID,
                
            }
        },
        matchDetails:{
            credit: args.matchInput.matchDetails.credit,  
            appointment: {
                day: new Date(args.matchInput.matchDetails.appointment.day),
                start: new Date(args.matchInput.matchDetails.appointment.start),
                end: new Date(args.matchInput.matchDetails.appointment.end)
            },
            field: args.matchInput.matchDetails.field,
            playersNumber: args.matchInput.matchDetails.playersNumber,
            needsRef: args.matchInput.matchDetails.needsRef
        },
        chat:{
            name: "Match chat",
            messages:[]
        },
        public: args.matchInput.public,
        minParticipants: args.matchInput.minParticipants
        
    });
    return match
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.createMatchWithNonPreSelectedTeams = async(args) => {
    const match = new Match({
        creator:args.matchInput.creator, 
        participants:{
            firstTeam:{
                teamID: args.matchInput.participants.firstTeam.teamID,
                acceptRandomPlayers: args.matchInput.participants.firstTeam.acceptRandomPlayers
            },
        },
        matchDetails:{
            credit: args.matchInput.matchDetails.credit,  
            appointment: {
                day: new Date(args.matchInput.matchDetails.appointment.day),
                start: new Date(args.matchInput.matchDetails.appointment.start),
                end: new Date(args.matchInput.matchDetails.appointment.end)
            },
            field: args.matchInput.matchDetails.field,
            playersNumber: args.matchInput.matchDetails.playersNumber,
            needsRef: args.matchInput.matchDetails.needsRef
        },
        chat:{
            name: "Match chat",
            messages:[]
        },
        public: args.matchInput.public,
        minParticipants: args.matchInput.minParticipants
        
    });
    return match
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.joinMatchAsPlayer = async(args) => {
    // console.log(args)
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
        existingMatch = await Match.findById(args.match_id)
        
        if(existingMatch !== undefined && existingMatch !== null)
        {
            if(ObjectId.isValid(args.player_id)){
                if(existingMatch.participants.team1Players){
                 
                    if(existingMatch.participants.team1Players.includes(args.player_id))
                    return "Player already in the match!"
                    if(existingMatch.participants.team2Players.includes(args.player_id))
                    return "Player already in the match!"
            
                    if(existingMatch.participants.team1Players.length < existingMatch.matchDetails.playersNumber/2)
                    existingMatch.participants.team1Players.push(args.player_id);
                    else
                    if(existingMatch.participants.team2Players.length < existingMatch.matchDetails.playersNumber/2)
                    {
                    console.log(existingMatch.participants.team2Players.type)
                    existingMatch.participants.team2Players.push(args.player_id);
                    }else
                    return "This match is already full!"
                    existingMatch.markModified('participants.team1Players');
                    existingMatch.markModified('participants.team2Players');
                }
                
                  else  
                  if(existingMatch.participants.firstTeam){ 
                        if(!existingMatch.participants.firstTeam.acceptRandomPlayers)
                        return "Solo players cannot join this match"
                        if(existingMatch.participants.secondTeam){
                            if(existingMatch.participants.secondTeam.teamPlayers.includes(args.player_id))
                            return "Player already in the match!"
                            if(existingMatch.participants.secondTeam.teamPlayers.length < existingMatch.matchDetails.playersNumber/2){
                                existingMatch.participants.secondTeam.teamPlayers.push(args.player_id);
                      
                            }else
                            return "This match is already full!"
                        }else
                            existingMatch.participants = {
                                firstTeam: existingMatch.participants.firstTeam,
                                secondTeam:{
                                    teamPlayers:[args.player_id],
                                    teamID:"LobbyPlayersTeam"
                                }
                            }
                        
                        existingMatch.markModified('participants.secondTeam.teamPlayers');
                        existingMatch.markModified('participants.secondTeam.teamID');
                    }
            
                    await existingMatch.save();
                    return "Player joined successfuly!";
            }
        
            return "Not a valid player ID!";
        }
        return "Match not found!";
    }
    return "Not a valid match ID!";

    } catch(err){
        console.log(err)
        return err;
    }
};

exports.joinMatchAsTeam = async(args) => {
    // console.log(args)
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id)
        
            if(existingMatch !== undefined && existingMatch !== null){  
             if(existingMatch.participants.firstTeam.teamID == args.teamInput.teamID)
                return "Team already in the match!"
                if(existingMatch.participants.secondTeam)
                return "This match is already full!"
                        
                            existingMatch.participants = {
                            firstTeam: existingMatch.participants.firstTeam,
                            secondTeam:{
                                teamID :args.teamInput.teamID
                            }
                            
                        }
                       // console.log("secondTeam players: "+ existingMatch.participants.secondTeam)
                        existingMatch.markModified('participants.secondTeam.teamPlayers');
                        existingMatch.markModified('participants.secondTeam.teamID');
                        
                    await existingMatch.save();
                    return "Team joined successfuly!";
            }
            return "Match not found!";
    }
    return "Not a valid match ID!";

    } catch(err){
        console.log(err)
        return err;
    }
};

exports.deleteMatch = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args._id)){
            existingMatch = await Match.findOne({'_id' : args._id});
            if(existingMatch !== undefined && existingMatch !== null)
            {
                await existingMatch.remove();
                return "Match removed!";
            }
            return "Match not found!";
            }
        return "Not a vlaid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.exitLobbyAsPlayer = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
           
            if(existingMatch !== undefined && existingMatch !== null){
                if(ObjectId.isValid(args.player_id)){
                    
                    if(existingMatch.participants.team1Players){
                       
                        if(existingMatch.participants.team1Players.includes(args.player_id)){
                            existingMatch.participants.team1Players = existingMatch.participants.team1Players
                            .filter(player => player != args.player_id );
                            existingMatch.markModified('participants.team1Players');
                            }
                            else if(existingMatch.participants.team2Players.includes(args.player_id)){
                                 existingMatch.participants.team2Players = existingMatch.participants.team2Players
                                .filter(player => player != args.player_id );
                                
                                existingMatch.markModified('participants.team2Players');
                            }
                            else return "Player does not belong to this match!";
                             
                    } else{
                        if(existingMatch.participants.secondTeam.teamPlayers.includes(args.player_id)){
                            existingMatch.participants.secondTeam.teamPlayers = existingMatch.participants.secondTeam.teamPlayers
                            .filter(player => player != args.player_id );
                            existingMatch.markModified('participants.secondTeam.teamPlayers');
                        } else return "Player does not belong to this match!";
                    }

                    await existingMatch.save();
                    return "Match updated!";
                }
            return "Not a valid player ID!";
        }
        return "The match does not exist";
        }
        return "Not a valid match ID!";
    }catch(err)
        {
        console.log(err);
        return err;
        }
}

exports.exitLobbyAsTeam = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
           
            if(existingMatch !== undefined && existingMatch !== null){
                
                if(existingMatch.participants.secondTeam && existingMatch.participants.secondTeam.teamID == args.team_id){
                    existingMatch.participants = {
                        firstTeam: existingMatch.participants.firstTeam
                    }
                    existingMatch.markModified('participants');
                } else return "Team does not belong to this match!";
                
                await existingMatch.save();
                return "Match updated!";
            }
            return "The match does not exist";
        }
        return "Not a valid match ID!";
    }catch(err)
    {
    console.log(err);
    return err;
    }
}

exports.addPhotoToGallery = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
            if(existingMatch !== null && existingMatch !== undefined){
                existingMatch.mediaGallery.push(args.photoString);
                await existingMatch.save();
                return "Photo added!";
            }
            return "Match not found!";
    }
    return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.clearMatchGallery = async(args) => {
    let existingMatch;
    try{

        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
            if(existingMatch !== undefined && existingMatch !== null){
                existingMatch.mediaGallery = [];
                await existingMatch.save();

                return "Gallery deleted!";
            }
        return "Match does not exist!";
    }return "Not a valid ID!"
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.deletePhotoFromMatchGallery = async(args) => {
    let existingMatch;
    console.log(args)
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
            if(existingMatch !== null && existingMatch !== undefined)
            {
                existingMatch.mediaGallery.pull(args.photoString);
                await existingMatch.save();

                return "Photo deleted!";
            }
            return "Match not found!"
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.sendMatchMessage = async(args) =>{
    let existingMatch;
    try{
        if(ObjectId.isValid(args.messageInput._id)){
            existingMatch = await Match.findById(args.messageInput._id);
            if(existingMatch !== undefined && existingMatch !== null)
            {
                let message = {
                    user_id: args.messageInput.user_id,
                    message: args.messageInput.message,

                };
                console.log(typeof( existingMatch.chat.messages))
                existingMatch.chat.messages.push(message);
                await existingMatch.save();
                return "Message send successfuly!";
            }
            return "Match not found!";}
        return "Not a valid match ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.clearMatchChat = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
            if(existingMatch !== undefined && existingMatch !== null)
            {
                existingMatch.chat.messages = [];
                await existingMatch.save();

                return "Chat deleted";
            }
            return "Match does not exist!";}
        return  "Not a valid ID!"
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.swapPlayersInMatchLobby = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
           
            if(existingMatch !== undefined && existingMatch !== null){
                
                if(ObjectId.isValid(args.player1_id) && ObjectId.isValid(args.player1_id)){
                    
                    if(existingMatch.participants.team1Players){
                       
                        if(existingMatch.participants.team1Players.includes(args.player1_id) && existingMatch.participants.team2Players.includes(args.player2_id)){
                          
                            existingMatch.participants.team1Players[existingMatch.participants.team1Players.indexOf(args.player1_id)] = args.player2_id
                            existingMatch.participants.team2Players[existingMatch.participants.team2Players.indexOf(args.player2_id)] = args.player1_id
                            }

                            else if(existingMatch.participants.team2Players.includes(args.player1_id) && existingMatch.participants.team1Players.includes(args.player2_id)){
                               
                            existingMatch.participants.team1Players[existingMatch.participants.team1Players.indexOf(args.player2_id)] = args.player1_id
                            existingMatch.participants.team2Players[existingMatch.participants.team2Players.indexOf(args.player1_id)] = args.player2_id
                            }
                            else return "Players do not belong to this match or they are in the same team already!";
                             
                    }else return "Invalid match selected!"

                    existingMatch.markModified('participants.team1Players');
                    existingMatch.markModified('participants.team2Players');
                    await existingMatch.save();
                    return "Match updated!";
                }
            return "Not a valid player ID!";
        }
        return "The match does not exist";
        }
        return "Not a valid match ID!";
    }catch(err)
        {
        console.log(err);
        return err;
        }
}

exports.editMatchDetails = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
            if(existingMatch !== null && existingMatch !== undefined){
                if(args.editMatchDetailsInput.field) { 
                    if(ObjectId.isValid(args.editMatchDetailsInput.field))
                    existingMatch.matchDetails.field = args.editMatchDetailsInput.field
                    else return "Not a valid field ID"
                }
                if(args.editMatchDetailsInput.needsRef)
                existingMatch.matchDetails.needsRef = args.editMatchDetailsInput.needsRef
                if(args.editMatchDetailsInput.appointment){
                    if(args.editMatchDetailsInput.appointment.start)
                    existingMatch.matchDetails.appointment.start = new Date(args.editMatchDetailsInput.appointment.start)
                    if(args.editMatchDetailsInput.appointment.end)
                    existingMatch.matchDetails.appointment.end = new Date(args.editMatchDetailsInput.appointment.end)
                }
                if(args.editMatchDetailsInput.playersNumber)
                existingMatch.matchDetails.playersNumber = args.editMatchDetailsInput.playersNumber
                await existingMatch.save();
                return "Match updated!";
                
                    
            }
            return "Match not found!";
        }
    return "Not a valid match ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.editPublicForMatch = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
            if(existingMatch !== null && existingMatch !== undefined){
              
                existingMatch.public = args.public

                await existingMatch.save();
                return "Match updated!";
            }
            return "Match not found!";
        }
    return "Not a valid match ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.editMatchStatus = async(args) => {
    let existingMatch;
    try{
        if(ObjectId.isValid(args.match_id)){
            existingMatch = await Match.findById(args.match_id);
            if(existingMatch !== null && existingMatch !== undefined){
              
                existingMatch.status = args.status
                if(existingMatch.matchDetails.appointment.end < Date.now())
                existingMatch.status = args.false

                await existingMatch.save();
                return "Match updated!";
            }
            return "Match not found!";
        }
    return "Not a valid match ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}