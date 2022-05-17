
exports.playerInput =
`
input CoachInput{
    cv : CVInput
    moneyZone: MoneyZoneCoachInput
    achivements: CoachAchivementsInput
    globalRating: String
    reviews: [ReviewInputCoach]
    coachingForm: CoachingForm
    trainings: [String]
    friends: [String]
    matches: [String]
    blocked: BlockInput
}
`

exports.cvInput = 
`
    input CVInput{
        cert: [CertInput]
        experience: [ExperienceInput]
        videos: [String]
    }
`

exports.certInput = 
`
    input CertInput{
        name: String
        date: String
        certImages: [String]!
    }
`

exports.experienceInput = 
`
    input ExperienceInput{
        description: String!
        duration: DurationCVInput
    }
`

exports.durationCVInput = 
`
    input DurationCVInput{
        startDate: String
        endDate: String
        days: Int
    }
`

exports.moneyZoneCoachInput = 
`
    input MoneyZoneCoachInput{
        tokens: Int
        transactionsHistory: [TrasactionCoachHistoryInput]
}
`

exports.trasactionCoachHistoryInput =
`
    input TrasactionCoachHistoryInput{
        tbi: String
    }
`

exports.coachAchivementsInput = 
`
    input CoachAchivementsInput{
        achivements: [CoachAchivementInput]
    }
`

exports.coachAchivementInput = 
`
    input CoachAchivementInput{
        tbi: String
    }
`

exports.reviewInputCoach =
`
    input ReviewInputCoach{
        criterium: String
        avarage: Float
        noReviewers: Int
    }
`

exports.addCertCVInput = 
`
    input AddCertCVInput{
        user_id: String!
        cert: CertInput!
    }
`

exports.removeCertCVInput = 
`
    input RemoveCertCVInput{
        user_id: String!
        name: String!
        date: String!
    }
`

exports.addPhotoCertCVInput = 
`
    input AddPhotoCertCVInput{
        user_id: String!
        index: Int!
        image: String!
    }
`

exports.removeAllPhotosCertCVInput =
`
    input RemoveAllPhotosCertCVInput{
        user_id: String!
        index: Int!
    }
    `
exports.updateCertCVInput =
`
    input UpdateCertCVInput{
        user_id: String!
        index: Int!
        name: String!
        date: String!
    }
`

exports.addExperienceCVInput = 
`
    input AddExperienceCVInput{
        user_id: String!
        experience: ExperienceInput!
    }
`

exports.removeExperienceCVInput = 
`
    input RemoveExperienceCVInput{
        user_id: String!
        index: Int!
    }
`

exports.updateExperienceCVInput = 
`
    input UpdateExperienceCVInput{
        user_id: String!
        index: Int!
        experience: ExperienceInput!
    }
`

exports.addVideoCVInput = 
`
    input AddVideoCVInput{
        user_id: String!
        video: String!
    }
`

exports.changeFormCoachInput =
`
    input ChangeFormCoachInput{
        user_id: String!
        form: CoachingForm

    }
`

exports.createTrainingCoachInput = 
`
    input CreateTrainingCoachInput{
        user_id: String!
        training_id: String!
    }
`


exports.addMatchCoachInput = 
`
    input AddMatchCoachInput{
        user_id: String!
        match_id: String! 
    }
`