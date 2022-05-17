exports.trainingTypeInput = 
`input TrainingInput {
    name: String!
    trainer: String!
    location: LocationInput!
    field: String!
    duration: TrainingDurationInput
    trainees: [TraineeInput!]
    description: String
}`

exports.traineeInput =
`input TraineeInput{
    traineeID: String!
    status: Boolean!
    ratings: RatingsInput
    feedback:String
}`

exports.trainingDurationInput =
`input TrainingDurationInput{
    date: String
    start: String!
    end: String!
    weekDays:[String]
    totalDays:Int
}`

exports.ratingsInput =
`input RatingsInput{
    technique: Int
    physical: Int

}`

exports.trainingAddTrainee = 
`input TrainingInputAddTrainee{
    _id: String!
    trainee:TraineeInput!
}`

exports.trainingDelete = 
`input TrainingInputDelete{
    _id: String!
}`

exports.removeTraineeFromTraining =
`input RemoveTraineeFromTraining{
    id_training: String!
    id_trainee: String!
}`

exports.ratingsForTraineeInput =
`input RatingsForTraineeInput{
    id_training: String!
  id_trainee: String!
    ratings: RatingsInput!
}`



exports.ticketInput =
`input TicketInput{
    id_trainee: String!
    id_trainer: String!
    subject: String!
    message: String!
}`