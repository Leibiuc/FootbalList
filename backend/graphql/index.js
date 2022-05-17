const userTypes = require('./user/index');
const fieldTypes = require('./field/index');
const teamTypes = require('./team/index');
const utilsTypes = require('./utils/index');
const trainingTypes = require('./training/index')
const matchTypes = require('./match/index')

exports.types = {
    utils :`
    ${utilsTypes.input.fileInput}
    ${utilsTypes.input.locationInput}
    ${utilsTypes.input.achivement}
    ${utilsTypes.input.appointment}
    ${utilsTypes.input.messageInput}
    ${utilsTypes.input.chatInput}
    ${utilsTypes.input.participantsInput}
    ${utilsTypes.input.ticketInput}
    ${utilsTypes.input.ticketsInput}


    ${utilsTypes.types.achivement}
    ${utilsTypes.types.fileType}
    ${utilsTypes.types.locationType}
    ${utilsTypes.types.appointment}
    ${utilsTypes.types.chatType}
    ${utilsTypes.types.participantsType}
    ${utilsTypes.types.messageType}
    ${utilsTypes.types.ticketType}
    ${utilsTypes.types.ticketsType}
    ${utilsTypes.types.typeOfTicket}

    `,

    user: `

    ${userTypes.input.userInput}
    ${userTypes.input.coachInitInput}
    ${userTypes.input.fieldOwnerInitInput}
    ${userTypes.input.userPersonalDetailsInput}
    ${userTypes.input.userPersonalDetailsUpdateInput}
    ${userTypes.input.updatePassword}
    ${userTypes.input.addFriendInput}
    ${userTypes.types.typeUser}
    ${userTypes.types.userPersonalDetails}
    ${userTypes.types.user_role}
    ${userTypes.types.role}

    ${userTypes.userTypeUnion}

    ${userTypes.player.input.playerInput}
    ${userTypes.player.input.moneyZoneInput}   
    ${userTypes.player.input.expensesVouchersInput}
    ${userTypes.player.input.promotionsInput}
    ${userTypes.player.input.transactionHistoryInput}
    ${userTypes.player.input.transactionsVouchersInput}
    ${userTypes.player.input.vouchersInput} 
    ${userTypes.player.input.badgeInput}
    ${userTypes.player.input.criteriumInput}
    ${userTypes.player.input.levelInput}  
    ${userTypes.player.input.playerAchivementsInput}
    ${userTypes.player.input.reviewPlayerInput}  
    ${userTypes.player.input.blockInput}
    ${userTypes.player.input.addTokensInput}
    ${userTypes.player.input.addPromotionInput}
    ${userTypes.player.input.removePromotionInput}
    ${userTypes.player.input.addTransactionVoucherInput}
    ${userTypes.player.input.removeVoucherInput}
    ${userTypes.player.input.changeCurrentFormInput}
    ${userTypes.player.input.reviewUserInput}
    ${userTypes.player.input.updateReviewUserInput}
    ${userTypes.player.input.addTrainingUserInput}
    
    ${userTypes.player.types.badgeType}
    ${userTypes.player.types.criteriumType}
    ${userTypes.player.types.currentForm}
    ${userTypes.player.types.levelType}
    ${userTypes.player.types.moneyZoneType}
    ${userTypes.player.types.promotionsType}
    ${userTypes.player.types.playerType}
    ${userTypes.player.types.expensesVouchersType}
    ${userTypes.player.types.reviewPLayerType}
    ${userTypes.player.types.transactionHistoryType}
    ${userTypes.player.types.transactionsVouchersType}
    ${userTypes.player.types.vouchersType}
    ${userTypes.player.types.playerAchivements}
    ${userTypes.player.types.blockType}

    ${userTypes.coach.types.certType}
    ${userTypes.coach.types.coachAchivement}
    ${userTypes.coach.types.coachAchivements}
    ${userTypes.coach.types.coachType}
    ${userTypes.coach.types.coachingForm}
    ${userTypes.coach.types.cvType}
    ${userTypes.coach.types.durationCV}
    ${userTypes.coach.types.experienceType}
    ${userTypes.coach.types.moneyZoneCoachType}
    ${userTypes.coach.types.reviewTypeCoach}
    ${userTypes.coach.types.trasactionCoachHistory}

    ${userTypes.coach.input.trasactionCoachHistoryInput}
    ${userTypes.coach.input.certInput}
    ${userTypes.coach.input.coachAchivementInput}
    ${userTypes.coach.input.coachAchivementsInput}
    ${userTypes.coach.input.cvInput}
    ${userTypes.coach.input.durationCVInput}
    ${userTypes.coach.input.experienceInput}
    ${userTypes.coach.input.moneyZoneCoachInput}
    ${userTypes.coach.input.playerInput}
    ${userTypes.coach.input.reviewInputCoach}
    ${userTypes.coach.input.addCertCVInput}
    ${userTypes.coach.input.removeCertCVInput}
    ${userTypes.coach.input.addPhotoCertCVInput}
    ${userTypes.coach.input.removeAllPhotosCertCVInput}
    ${userTypes.coach.input.updateCertCVInput}
    ${userTypes.coach.input.addExperienceCVInput}
    ${userTypes.coach.input.removeExperienceCVInput}
    ${userTypes.coach.input.updateExperienceCVInput}
    ${userTypes.coach.input.addVideoCVInput}
    ${userTypes.coach.input.changeFormCoachInput}
    ${userTypes.coach.input.createTrainingCoachInput}
    ${userTypes.coach.input.addMatchCoachInput}

    ${userTypes.fieldOwner.types.billDetailType}
    ${userTypes.fieldOwner.types.billType}
    ${userTypes.fieldOwner.types.businessDetailsType}
    ${userTypes.fieldOwner.types.contactPersonType}
    ${userTypes.fieldOwner.types.fieldOwnerType}
    ${userTypes.fieldOwner.types.moneyZoneFieldOwnerType}
    ${userTypes.fieldOwner.types.statisticsType}
    ${userTypes.fieldOwner.types.transactionsType}
    ${userTypes.fieldOwner.types.transactionDetailsType}

    ${userTypes.fieldOwner.input.billDetailInput}
    ${userTypes.fieldOwner.input.billInput}
    ${userTypes.fieldOwner.input.businessDetailsInput}
    ${userTypes.fieldOwner.input.contactPersonInput}
    ${userTypes.fieldOwner.input.fieldOwnerInput}
    ${userTypes.fieldOwner.input.moneyZoneFieldOwnerInput}
    ${userTypes.fieldOwner.input.statisticsInput}
    ${userTypes.fieldOwner.input.transactionsInput}
    ${userTypes.fieldOwner.input.transactionDetailsInput}
    ${userTypes.fieldOwner.input.addMoneyInput}
    ${userTypes.fieldOwner.input.addBillFieldOwnerInput}
    ${userTypes.fieldOwner.input.removeBillFieldOwnerInput}
    ${userTypes.fieldOwner.input.addTransactionFieldOwnerInput}
    ${userTypes.fieldOwner.input.addFieldToOwnerInput}
    ${userTypes.fieldOwner.input.addEmployeeToFieldOwnerInput}
    ${userTypes.fieldOwner.input.addStatisticToFieldOwnerInput}
    ${userTypes.fieldOwner.input.removeStatisticFromFieldOwnerInput}
    ${userTypes.fieldOwner.input.editStatisticFromFieldOwnerInput}
    ${userTypes.fieldOwner.input.editBusinessDetailsFieldOwnerIntput}
    ${userTypes.fieldOwner.input.businessDetailsEditInput}
    ${userTypes.fieldOwner.input.addTicketFieldOwnerInput}
    ${userTypes.fieldOwner.input.changeSolvedTicketFieldOwnerInput}
    ${userTypes.fieldOwner.input.addContactPersonInFieldOwnerInput}
    ${userTypes.fieldOwner.input.removeContactPersonFromFieldOwnerInput}
    ${userTypes.fieldOwner.input.editContactPersonFromFieldOwnerInput}
    ${userTypes.fieldOwner.input.addChatFieldOwnerInput}
    ${userTypes.fieldOwner.input.changeNameInChatFieldOwnerInput}
    ${userTypes.fieldOwner.input.addMessageInFieldOwnerInput}
    ${userTypes.fieldOwner.input.removeMessageInFieldOwnerInput}
    ${userTypes.fieldOwner.input.clearAllMessagesInFieldOwnerInput}

    `,

    field: `
    ${fieldTypes.input.fieldInput}
    ${fieldTypes.input.fieldPageInput}
    ${fieldTypes.types.typeField}
    `,

    team:`
    ${teamTypes.input.achivementsInput}
    ${teamTypes.input.ratingInput}
    ${teamTypes.input.teamDetailsInput}
    ${teamTypes.input.teamTypeInput}
    ${teamTypes.input.teamDetailsInputCreate}
    ${teamTypes.input.teamTypeInputCreate}
    ${teamTypes.input.teamAddPlayer}
    ${teamTypes.input.removePlayerFromTeam}
    ${teamTypes.input.updateChampionship}
    ${teamTypes.input.updateRating}
    ${teamTypes.input.addAchivement}
    ${teamTypes.input.updateAchivement}
    ${teamTypes.input.addPhoto}
    ${teamTypes.input.deletePhoto}

    ${teamTypes.types.achivementsType}
    ${teamTypes.types.ratingType}
    ${teamTypes.types.teamDetailsType}
    ${teamTypes.types.teamType}`,

    
    training:`
    ${trainingTypes.input.ratingsInput}
    ${trainingTypes.input.trainingDurationInput}
    ${trainingTypes.input.traineeInput}
    ${trainingTypes.input.trainingTypeInput}
    ${trainingTypes.input.trainingAddTrainee}
    ${trainingTypes.input.trainingDelete}
    ${trainingTypes.input.removeTraineeFromTraining}
    ${trainingTypes.input.ratingsForTraineeInput}
    
    ${trainingTypes.types.ratingsType}
    ${trainingTypes.types.traineeType}
    ${trainingTypes.types.trainingDurationType}
    ${trainingTypes.types.trainingType}`,

    match:`
    ${matchTypes.input.matchWithExistingTeamsInput}
    ${matchTypes.input.matchDetailsInput}
    ${matchTypes.input.matchWithLobbyTeamsInput}
    ${matchTypes.input.editMatchDetailsInput}
    ${matchTypes.matchTeams.input.matchLobbyTeamsInput}
    ${matchTypes.matchTeams.input.matchTeamInput}
    ${matchTypes.matchTeams.input.matchTeamsInput}
  
    ${matchTypes.types.matchType}
    ${matchTypes.types.matchDetailsType}
    ${matchTypes.types.matchStatisticsType}
    ${matchTypes.matchTeams.types.matchTeamsType}
    ${matchTypes.matchTeams.types.matchTeamType}
    ${matchTypes.matchTeams.types.matchLobyyTeamType}
    ${matchTypes.participantsTypeUnion}
    `,
}