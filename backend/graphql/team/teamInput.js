exports.teamTypeInput = 
`   input TeamInput{
    leader: String!
    teamDetails: TeamDetailsInput!
    championship: String        
    teamAchivements: AchivementsInput
}
`
exports.achivementsInput = 
`input AchivementsInput{
    achivement: [AchivementInput!]    
}`


exports.teamDetailsInput =
`input TeamDetailsInput{
    name: String!
    creationDate: String!
    avatar: String
    rating: RatingInput
    location: LocationInput
}`

exports.ratingInput =
`input RatingInput{
    stars: [String!]
}`


 

exports.teamTypeInputCreate = 
`   input TeamInputCreate{
    leader: String!
    teamDetails: TeamDetailsInputCreate!
}`

exports.teamDetailsInputCreate =
`input TeamDetailsInputCreate{
    name: String!
    creationDate: String!
    avatar: String
    location: LocationInput
}`

exports.teamAddPlayer = 
`input TeamInputAddPlayer{
    _id: String!
    playerId: String!
}`

exports.removePlayerFromTeam =
`input RemovePlayerFromTeam{
    id_team: String!
    id_player: String!
}`


exports.updateChampionship = 
`input UpdateChampionship{
    team_id: String!
    championship: String!
}` 

exports.updateRating =
`input UpdateRating{
    team_id: String!
    stars: [String!]
}`

exports.addAchivement =
`input AddAchivement{
    team_id: String!
    achivement: AchivementInput!
}`

exports.updateAchivement = 
`input UpdateAchivement{
    team_id: String!
    achivement_id: String!
    progress: Int!
}`

exports.addPhoto = 
`input AddPhoto{
    team_id: String!
    photo: FileInput!
}
`


exports.deletePhoto =
`input DeletePhoto{
    team_id: String!
    photo: FileInput!
}
`