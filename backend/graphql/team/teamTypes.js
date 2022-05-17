exports.teamType = 
`   type Team{
    _id : String!
    leader: String!
    players: [String!]
    teamDetails: TeamDetails!
    chat: [Chat!]
    teamGallery: [String!]
    championship: String        
    teamAchivements: Achivements
}
`



exports.achivementsType = 
`type Achivements{
    achivement: [Achivement!]    
}`

exports.teamDetailsType =
`type TeamDetails{
    name: String!
    creationDate: String!
    avatar: String
    rating: Rating
    location: Location
}`

exports.ratingType =
`type Rating{
    stars: [String!] 
}`

