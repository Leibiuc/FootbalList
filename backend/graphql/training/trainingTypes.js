exports.trainingType = 
`   type Training{
    _id : String!
    name: String!
    trainer: String!
    location: Location!
    field: String!
    duration: TrainingDuration
    trainees: [Trainee]        
    description: String,
    chat:Chat
}
`

exports.trainingDurationType =
`type TrainingDuration{
    date: String
    start: String!
    end: String!
    weekDays:[String]
    totalDays:Int
}`

exports.traineeType =
`type Trainee{
    traineeID: String!
    status: Boolean!
    ratings: Ratings
    feedback:String
}`

exports.ratingsType =
`type Ratings{
    technique: Int
    phisical: Int
}`


