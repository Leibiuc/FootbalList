exports.coachType = 
`
type CoachType{
    cv : CVType
    moneyZone: MoneyZoneCoachType
    achivements: CoachAchivements
    globalRating: String
    reviews: [ReviewTypeCoach]
    coachingForm: CoachingForm
    trainings: [String]
    friends: [String]
    matches: [String]
    blocked: BlockType
}
`

exports.cvType = 
`
    type CVType{
        cert: [CertType]
        experience: [ExperienceType]
        videos: [String]
    }
`

exports.certType = 
`
    type CertType{
        name: String
        date: String
        certImages: [String]
    }
`

exports.experienceType = 
`
    type ExperienceType{
        description: String
        duration: DurationCV
    }
`

exports.durationCV = 
`
    type DurationCV{
        startDate: String
        endDate: String
        days: Int
    }
`

exports.moneyZoneCoachType = 
`
type MoneyZoneCoachType{
    tokens: Int
    transactionsHistory: [TrasactionCoachHistory]
}
`

exports.trasactionCoachHistory =
`
    type TrasactionCoachHistory{
        tbi: String
    }
`

exports.coachAchivements = 
`
    type CoachAchivements{
        achivements: CoachAchivement
    }
`

exports.coachAchivement = 
`
    type CoachAchivement{
        tbi: String
    }
`

exports.reviewTypeCoach =
`
    type ReviewTypeCoach{
        criterium: String
        avarage: Float
        noReviewers: Int
    }
`

exports.coachingForm = 
`
    enum CoachingForm{
        JUNIOR
        SEMI_PRO
        PRO
        ADDICTED
        GOD_AMONG_US 
    }
`