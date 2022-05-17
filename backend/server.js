const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express')
    .default;
const bodyParser= require('body-parser');
const { graphqlHTTP } = require("express-graphql");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const {
    buildSchema,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const {path, endpoint, port} = require('./config');

const types = require('./graphql/index').types;
const querys = require('./middleware/index').rootQuery;
const mutations = require('./middleware/index').rootMutation;



//const middleware = require('./middleware/index').middleware;
const formatRootValue = require('./rootValue').rootValue;
const app = express(); 

app.use(bodyParser.json());
app.use(cors());

// personal_details: PersonalDetails!
app.get(path, expressPlayground({ endpoint: endpoint}));
app.use(graphqlHTTP({
    graphiql: true,                     //Delete this before build
    schema: buildSchema(`
    

    scalar Date

    ${types.user}
    ${types.team}
    ${types.utils}
    ${types.match}
    ${types.training}
    ${types.field}

    
    type RootMutation {
        ${mutations}
    }

    type RootQuery {
        ${querys}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),


    rootValue: formatRootValue/*{
        //query user
        users: middleware.user.query.users,
        getUserByID: middleware.user.query.getUserByID,
        getUsersByCurentForm: middleware.user.query.getUsersByCurentForm,
        doesUserHavePromotion: middleware.user.query.doesUserHavePromotion,
        getUsersByUserRole: middleware.user.query.getUsersByUserRole,
        getPlayersOrCoaches: middleware.user.query.getPlayersOrCoaches,
        getAllButPlayersAndCoaches: middleware.user.query.getAllButPlayersAndCoaches,

        //mutatin user
        createUser: middleware.user.mutation.createUser,
        login: middleware.user.mutation.login,
        logout: middleware.user.mutation.logout,
        deleteUser: middleware.user.mutation.deleteUser,
        updateUserDetails: middleware.user.mutation.updateUserDetails,
        updatePassword: middleware.user.mutation.updatePassword,
        resetPassword: middleware.user.mutation.resetPassword,

        //mutation player
        addFriendPlayer: middleware.user.mutation.addFriendPlayer,
        removeFriendPlayer: middleware.user.mutation.removeFriendPlayer,
        blockSomeone:middleware.user.mutation.blockSomeone,
        unblockSomeone:middleware.user.mutation.unblockSomeone,
        addTokens: middleware.user.mutation.addTokens,
        removeTokens: middleware.user.mutation.removeTokens,
        addNewPromotion: middleware.user.mutation.addNewPromotion,
        removeExistingPromotion: middleware.user.mutation.removeExistingPromotion,
        addVoucherTransactionUser: middleware.user.mutation.addVoucherTransactionUser,
        removeVoucherTransactionUser: middleware.user.mutation.removeVoucherTransactionUser,
        addVoucherExpenseUser: middleware.user.mutation.addVoucherExpenseUser,
        removeVoucherExpenseUser: middleware.user.mutation.removeVoucherExpenseUser,
        changeCurrentFormUser: middleware.user.mutation.changeCurrentFormUser,
        addReviewUser: middleware.user.mutation.addReviewUser,
        updateReviewUser: middleware.user.mutation.updateReviewUser,
        addNewTraining: middleware.user.mutation.addNewTraining,
        removeTraining: middleware.user.mutation.removeTraining,

        //mutation coach
        createCoach: middleware.user.mutation.createCoach,
        addCertCV: middleware.user.mutation.addCertCV,
        removeCertCV: middleware.user.mutation.removeCertCV,
        addPhotoCertCV: middleware.user.mutation.addPhotoCertCV,
        removePhotoCertCV: middleware.user.mutation.removePhotoCertCV,
        removeAllPhotosCertCV: middleware.user.mutation.removeAllPhotosCertCV,
        updateCertCV: middleware.user.mutation.updateCertCV,
        addExperienceCV: middleware.user.mutation.addExperienceCV,
        removeExperienceCV: middleware.user.mutation.removeExperienceCV,
        updateExperienceCV: middleware.user.mutation.updateExperienceCV,
        addVideoCV: middleware.user.mutation.addVideoCV,
        removeVideoCV: middleware.user.mutation.removeVideoCV,
        removeAllVideosCV: middleware.user.mutation.removeAllVideosCV,
        changeFormCoach: middleware.user.mutation.changeFormCoach,
        createTrainingsCoach: middleware.user.mutation.createTrainingsCoach,
        removeTrainingCoach: middleware.user.mutation.removeTrainingCoach,
        addMatchCoach: middleware.user.mutation.addMatchCoach,
        removeMatchCoach: middleware.user.mutation.removeMatchCoach,
        
        //mutrationv field owner
        createFieldOwner: middleware.user.mutation.createFieldOwner,
        addMoneyFieldOwner: middleware.user.mutation.addMoneyFieldOwner,
        removeMoneyFieldOwner: middleware.user.mutation.removeMoneyFieldOwner,
        clearCurrentMoney: middleware.user.mutation.clearCurrentMoney,
        addBillFieldOwner: middleware.user.mutation.addBillFieldOwner,
        removeBillFieldOwner: middleware.user.mutation.removeBillFieldOwner,
        removeAllBillsFieldOwner: middleware.user.mutation.removeAllBillsFieldOwner,
        addTransactionFieldOwner:middleware.user.mutation.addTransactionFieldOwner,
        removeTransactionFieldOwner: middleware.user.mutation.removeTransactionFieldOwner,
        removeAllTransactionsFieldOwner: middleware.user.mutation.removeAllTransactionsFieldOwner,
        addFieldForFieldOwner: middleware.user.mutation.addFieldForFieldOwner,
        removeFieldForFieldOwner: middleware.user.mutation.removeFieldForFieldOwner,
        removeAllFieldsOfFieldOwner: middleware.user.mutation.removeAllFieldsOfFieldOwner,
        addEmployeeToFieldOwner: middleware.user.mutation.addEmployeeToFieldOwner,
        removeEmployeeFromFieldOwner: middleware.user.mutation.removeEmployeeFromFieldOwner,
        removeAllEmployeesFromFieldOwner: middleware.user.mutation.removeAllEmployeesFromFieldOwner,
        addStatisticToFieldOwner: middleware.user.mutation.addStatisticToFieldOwner,
        removeStatisticFromFieldOwner: middleware.user.mutation.removeStatisticFromFieldOwner,
        editStatisticFromFieldOwner: middleware.user.mutation.editStatisticFromFieldOwner,
        removeAllStatisticsFromFieldOwner: middleware.user.mutation.removeAllStatisticsFromFieldOwner,
        editBusinessDetailsFieldOwner: middleware.user.mutation.editBusinessDetailsFieldOwner,
        addTicketFieldOwner: middleware.user.mutation.addTicketFieldOwner,
        changeSolvedTicketFieldOwner: middleware.user.mutation.changeSolvedTicketFieldOwner,
        addContactPersonInFieldOwner: middleware.user.mutation.addContactPersonInFieldOwner,
        removeContactPersonFromFieldOwner: middleware.user.mutation.removeContactPersonFromFieldOwner,
        editContactPersonFromFieldOwner: middleware.user.mutation.editContactPersonFromFieldOwner,
        addChatInFieldOwner:middleware.user.mutation.addChatInFieldOwner,
        deleteAllContactPeopleFromFieldOwner: middleware.user.mutation.deleteAllContactPeopleFromFieldOwner,
        changeNameInChatFieldOwner:middleware.user.mutation.changeNameInChatFieldOwner,
        addMessageInFieldOwner: middleware.user.mutation.addMessageInFieldOwner,
        removeMessageInFieldOwner: middleware.user.mutation.removeMessageInFieldOwner,
        clearAllMessagesInFieldOwner: middleware.user.mutation.clearAllMessagesInFieldOwner,
        changeYourNameInAllChatsFieldOwner:middleware.user.mutation.changeYourNameInAllChatsFieldOwner,

        // querry field
        fields:middleware.field.query.fields,
        getFieldByID: middleware.field.query.getFieldByID,
        //mutation field 
        createField: middleware.field.mutation.createField,
       

        //query team
        teams: middleware.team.query.teams,
        getTeamByID: middleware.team.query.getTeamByID,

        //mutation team
        createTeam: middleware.team.mutation.createTeam,
        deleteTeam: middleware.team.mutation.deleteTeam,
        addPlayer: middleware.team.mutation.addPlayer,
        removePlayerFromTeam: middleware.team.mutation.removePlayerFromTeam,
        swapLeader: middleware.team.mutation.swapLeader,
        sendTeamMessage: middleware.team.mutation.sendTeamMessage,
        clearTeamChat: middleware.team.mutation.clearTeamChat,
        clearGallery: middleware.team.mutation.clearGallery,
        getTeamByOwner: middleware.team.mutation.getTeamByOwner,
        setTeamChampionship: middleware.team.mutation.setTeamChampionship,
        sendTeamMessage: middleware.team.mutation.sendTeamMessage,
        setRating: middleware.team.mutation.updateRating,
        addAchivement: middleware.team.mutation.addAchivement,
        updateAchivement: middleware.team.mutation.updateAchivement,
        addPhotoToGallery: middleware.team.mutation.addPhotoToGallery,
        deletePhotofromGallery: middleware.team.mutation.deletePhotofromGallery,
        

        // training query
        trainings: middleware.training.query.trainings,
        getTrainingByID: middleware.training.query.getTrainingByID,
        // trainings mutations 
        createTraining: middleware.training.mutation.createTraining,
        addTrainee:middleware.training.mutation.addTrainee,
        deleteTraining:middleware.training.mutation.deleteTraining,
        removeTraineeFromTraining:middleware.training.mutation.removeTraineeFromTraining,
        leaveFeedbackForTrainer:middleware.training.mutation.leaveFeedbackForTrainer,
        addRatingsForTrainee:middleware.training.mutation.addRatingsForTrainee,
        getTrainingsByTrainer: middleware.training.mutation.getTrainingsByTrainer,
        sendTrainingMessage: middleware.training.mutation.sendTrainingMessage,
        clearTrainingChat: middleware.training.mutation.clearTrainingChat,
        changeTrainingField: middleware.training.mutation.changeTrainingField,
        changeTrainingDuration: middleware.training.mutation.changeTrainingDuration,
        changeTrainingLocation: middleware.training.mutation.changeTrainingLocation,

        //query match
        matches: middleware.match.query.matches,
        getMatchByID: middleware.match.query.getMatchByID,
        // matches mutations 
        createMatchWithLobbyTeams: middleware.match.mutation.createMatchWithLobbyTeams,
        createMatchWithPreSelectedTeams: middleware.match.mutation.createMatchWithPreSelectedTeams,
        createMatchWithNonPreSelectedTeams: middleware.match.mutation.createMatchWithNonPreSelectedTeams,
        joinMatchAsPlayer:middleware.match.mutation.joinMatchAsPlayer,
        createMatchWithLobbyTeams: middleware.match.mutation.createMatchWithLobbyTeams,
        createMatchWithPreSelectedTeams: middleware.match.mutation.createMatchWithPreSelectedTeams,
        createMatchWithNonPreSelectedTeams: middleware.match.mutation.createMatchWithNonPreSelectedTeams,
        joinMatchAsTeam:middleware.match.mutation.joinMatchAsTeam,
        deleteMatch: middleware.match.mutation.deleteMatch,
        exitLobbyAsPlayer: middleware.match.mutation.exitLobbyAsPlayer,
        exitLobbyAsTeam: middleware.match.mutation.exitLobbyAsTeam,
        addPhotoToMatchGallery: middleware.match.mutation.addPhotoToGallery,
        clearMatchGallery: middleware.match.mutation.clearMatchGallery,
        deletePhotoFromMatchGallery: middleware.match.mutation.deletePhotoFromMatchGallery,
        sendMatchMessage: middleware.match.mutation.sendMatchMessage,
        clearMatchChat: middleware.match.mutation.clearMatchChat,
        swapPlayersInMatchLobby: middleware.match.mutation.swapPlayersInMatchLobby,
        editMatchDetails: middleware.match.mutation.editMatchDetails,
        editPublicForMatch: middleware.match.mutation.editPublicForMatch,
        editMatchStatus: middleware.match.mutation.editMatchStatus
    }*/
}));

mongoose
    .connect('mongodb+srv://Leibiuc:KudZc37WGewrl0UQ@cluster0.h2a0m.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
    .then(() => {
        app.listen(parseInt(port), () => console.log("Server is running on "+port));
    })
    .catch(err => {
        console.log(err);
    });

    //fotbalist connect: `mongodb+srv://admin_fotbalist:PrivateLabel69@cluster0.bxdkv.mongodb.net/FOTBALIST?retryWrites=true&w=majority`