const user = require('./user/index')
const field = require('./field/index')
const team = require('./team/index')
const training = require('./training/index')
const match = require('./match/index')


exports.middleware = {
    user,
    field,
    team,
    training,
    match
}

exports.rootMutation = `
        createUser(userInput: UserInput): User
        createCoach(userInput: CoachInitInput): User
        createFieldOwner(userInput: FieldOwnerInitInput): User
        deleteUser(_id : String!): String
        login(user_name: String! user_password: String!): User
        logout(user_id: String!): String
        getUserByID(_id: String!): User
        updateUserDetails(personalDetailsUpdateInput: PersonalDetailsUpdateInput): String
        updatePassword(updatePassword: UpdatePassword!): String
        resetPassword(email: String!): String
        addFriendPlayer(addFriendInput: AddFriendInput): String
        removeFriendPlayer(addFriendInput: AddFriendInput): String
        blockSomeone(addFriendInput: AddFriendInput): String
        unblockSomeone(addFriendInput: AddFriendInput): String
        addTokens(addTokensInput: AddTokensInput): String
        removeTokens(addTokensInput: AddTokensInput): String
        addNewPromotion(addPromotionInput: AddPromotionInput): String
        removeExistingPromotion(removePromotionInput: RemovePromotionInput): String
        addVoucherTransactionUser(addTransactionVoucherInput: AddTransactionVoucherInput): String
        removeVoucherTransactionUser(removeVoucherInput: RemoveVoucherInput): String
        addVoucherExpenseUser(addTransactionVoucherInput: AddTransactionVoucherInput): String
        removeVoucherExpenseUser(removeVoucherInput: RemoveVoucherInput): String
        changeCurrentFormUser(changeCurrentFormInput: ChangeCurrentFormInput): String
        addReviewUser(reviewUserInput: ReviewUserInput): String
        updateReviewUser(updateReviewUserInput: UpdateReviewUserInput): String
        addNewTraining(addTrainingUserInput:AddTrainingUserInput): String
        removeTraining(addTrainingUserInput:AddTrainingUserInput): String
        addCertCV(addCertCVInput: AddCertCVInput): String
        removeCertCV(removeCertCVInput: RemoveCertCVInput): String
        addPhotoCertCV(addPhotoCertCVInput: AddPhotoCertCVInput): String
        removePhotoCertCV(addPhotoCertCVInput: AddPhotoCertCVInput): String
        removeAllPhotosCertCV(removeAllPhotosCertCVInput: RemoveAllPhotosCertCVInput): String
        updateCertCV(updateCertCVInput: UpdateCertCVInput): String
        addExperienceCV(addExperienceCVInput: AddExperienceCVInput): String
        removeExperienceCV(removeExperienceCVInput: RemoveExperienceCVInput): String
        updateExperienceCV(updateExperienceCVInput: UpdateExperienceCVInput): String
        addVideoCV(addVideoCVInput: AddVideoCVInput): String
        removeVideoCV(addVideoCVInput: AddVideoCVInput): String
        removeAllVideosCV(user_id: String): String
        changeFormCoach(changeFormCoachInput: ChangeFormCoachInput): String
        
        createField(fieldInput: FieldInput): Field
        getFieldByID(id_field: String!): Field
        
        createTrainingsCoach(createTrainingCoachInput: CreateTrainingCoachInput): String
        removeTrainingCoach(createTrainingCoachInput: CreateTrainingCoachInput): String
        addMatchCoach(addMatchCoachInput: AddMatchCoachInput): String
        removeMatchCoach(addMatchCoachInput: AddMatchCoachInput): String
        addMoneyFieldOwner(addMoneyInput: AddMoneyInput): String
        removeMoneyFieldOwner(addMoneyInput: AddMoneyInput): String
        clearCurrentMoney(user_id: String): String
        addBillFieldOwner(addBillFieldOwnerInput: AddBillFieldOwnerInput): String
        removeBillFieldOwner(removeBillFieldOwnerInput: RemoveBillFieldOwnerInput): String
        removeAllBillsFieldOwner(user_id: String): String
        addTransactionFieldOwner(addTransactionFieldOwnerInput:AddTransactionFieldOwnerInput): String
        removeTransactionFieldOwner(removeTransactionFieldOwnerInput: RemoveBillFieldOwnerInput): String
        removeAllTransactionsFieldOwner(user_id: String): String
        addFieldForFieldOwner(addFieldToOwnerInput: AddFieldToOwnerInput): String
        removeFieldForFieldOwner(addFieldToOwnerInput: AddFieldToOwnerInput): String
        removeAllFieldsOfFieldOwner(user_id: String): String
        addEmployeeToFieldOwner(addEmployeeToFieldOwnerInput: AddEmployeeToFieldOwnerInput): String
        removeEmployeeFromFieldOwner(addEmployeeToFieldOwnerInput: AddEmployeeToFieldOwnerInput): String
        removeAllEmployeesFromFieldOwner(user_id: String): String
        addStatisticToFieldOwner(addStatisticToFieldOwnerInput: AddStatisticToFieldOwnerInput): String
        removeStatisticFromFieldOwner(removeStatisticFromFieldOwnerInput: RemoveStatisticFromFieldOwnerInput):String
        editStatisticFromFieldOwner(editStatisticFromFieldOwnerInput: EditStatisticFromFieldOwnerInput): String
        removeAllStatisticsFromFieldOwner(user_id: String): String
        editBusinessDetailsFieldOwner(editBusinessDetailsFieldOwnerIntput: EditBusinessDetailsFieldOwnerIntput): String
        addTicketFieldOwner(addTicketFieldOwnerInput: AddTicketFieldOwnerInput): String
        changeSolvedTicketFieldOwner(changeSolvedTicketFieldOwnerInput:ChangeSolvedTicketFieldOwnerInput): String
        addContactPersonInFieldOwner(addContactPersonInFieldOwnerInput: AddContactPersonInFieldOwnerInput): String
        removeContactPersonFromFieldOwner(removeContactPersonFromFieldOwnerInput: RemoveContactPersonFromFieldOwnerInput): String
        editContactPersonFromFieldOwner(editContactPersonFromFieldOwnerInput: EditContactPersonFromFieldOwnerInput): String
        addChatInFieldOwner(addChatFieldOwnerInput: AddChatFieldOwnerInput): String
        deleteAllContactPeopleFromFieldOwner(user_id: String): String
        changeNameInChatFieldOwner(changeNameInChatFieldOwnerInput: ChangeNameInChatFieldOwnerInput): String
        addMessageInFieldOwner(addMessageInFieldOwnerInput: AddMessageInFieldOwnerInput): String
        removeMessageInFieldOwner(removeMessageInFieldOwnerInput: RemoveMessageInFieldOwnerInput): String
        clearAllMessagesInFieldOwner(clearAllMessagesInFieldOwnerInput: ClearAllMessagesInFieldOwnerInput): String
        changeYourNameInAllChatsFieldOwner(user_id: String): String

        createTeam(teamInput: TeamInputCreate): Team
        addPlayer(addPlayerInput: TeamInputAddPlayer): String
        deleteTeam(_id: String!): String
        removePlayerFromTeam(removePlayerFromTeam: RemovePlayerFromTeam!): String
        swapLeader(removePlayerFromTeam: RemovePlayerFromTeam!): String
        sendTeamMessage(messageInput: MessageInput): String
        clearTeamChat(team_id: String!): String
        clearGallery(team_id: String!): String
        getTeamByID(team_id: String!): Team
        getTeamByOwner(leader_id: String!): Team
        setTeamChampionship(updateChampionship: UpdateChampionship!): String
        setRating(updateRating: UpdateRating!): String
        addAchivement(addAchivement: AddAchivement): String
        updateAchivement(updateAchivement: UpdateAchivement): String
        addPhotoToGallery(addPhoto: AddPhoto): String
        deletePhotofromGallery(deletePhoto: DeletePhoto): String

        createTraining(trainingInput: TrainingInput ): Training
        addTrainee(addTraineeInput: TrainingInputAddTrainee): String
        deleteTraining(deleteTrainingInput: TrainingInputDelete): String
        removeTraineeFromTraining(removeTraineeFromTraining: RemoveTraineeFromTraining): String
        leaveFeedbackForTrainer(feedback: String! trainee_ID: String trainingID: String!): String
        addRatingsForTrainee(addRatingsForTraineeInput: RatingsForTraineeInput): String
        getTrainingByID(id_training: String!): Training
        getTrainingsByTrainer(trainer_id: String!): [Training]
        sendTrainingMessage(messageInput: MessageInput): String
        clearTrainingChat(training_id: String!): String
        changeTrainingField(training_id: String! field_id: String): String
        changeTrainingDuration(training_id: String! date_start: String date_end: String): String
        changeTrainingLocation(training_id: String! locationInput: LocationInput): String
        

        createMatchWithLobbyTeams(matchInput: MatchWithLobbyTeamsInput ): Match
        createMatchWithPreSelectedTeams(matchInput: MatchWithExistingTeamsInput ): Match
        createMatchWithNonPreSelectedTeams(matchInput: MatchWithExistingTeamsInput ): Match
        joinMatchAsPlayer(match_id: String! player_id: String!): String
        joinMatchAsTeam(match_id: String! teamInput: MatchExistingTeamInput!): String
        deleteMatch(_id: String!): String
        exitLobbyAsPlayer(match_id: String! player_id: String!): String
        exitLobbyAsTeam(match_id: String! team_id: String!): String
        addPhotoToMatchGallery(match_id: String photoString: String): String
        clearMatchGallery(match_id: String ): String
        deletePhotoFromMatchGallery(match_id: String! photoString: String): String
        sendMatchMessage(messageInput: MessageInput): String
        clearMatchChat(match_id: String): String
        swapPlayersInMatchLobby(match_id: String! player1_id: String! player2_id: String!): String
        editMatchDetails(match_id: String! editMatchDetailsInput: EditMatchDetailsInput ): String
        editPublicForMatch(match_id: String! public: Boolean!): String
        editMatchStatus(match_id: String! status: Boolean!): String
        `

exports.rootQuery = `
    users: [User!]!
    getPlayersOrCoaches: [User!]
    getAllButPlayersAndCoaches: [User!]
    getUserByID(_id: String): User
    getUsersByCurentForm(currentForm: CurrentForm): [User!]
    doesUserHavePromotion(removePromotionInput: RemovePromotionInput): Boolean
    getUsersByUserRole(role: UserRole): [User!]
    teams: [Team!]
    getTeamByID(_id: String): Team
    trainings: [Training!]
    getTrainingByID(_id: String): Training
    fields: [Field!]
    getFieldByID: Field
    matches: [Match!]
    getMatchByID(_id: String): Match
`


exports.rootSubscription = `
`
