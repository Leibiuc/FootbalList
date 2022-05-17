exports.matchWithLobbyTeamsInput = 
`   input MatchWithLobbyTeamsInput{
    creator: String!
    participants: MatchLobbyTeamsInput 
    matchDetails: MatchDetailsInput!      
    public: Boolean
    minParticipants: Int
}
`

exports.matchDetailsInput = `input MatchDetailsInput {
    credit: Int!
    appointment: AppointmentInput!
    field: String!
    playersNumber: Int
    needsRef: Boolean
}`


exports.matchWithExistingTeamsInput = 
`   input MatchWithExistingTeamsInput{
    creator: String!
    participants: MatchExistingTeamsInput 
    matchDetails: MatchDetailsInput!      
    public: Boolean
    minParticipants: Int
}
`

exports.editMatchDetailsInput = 
`   input EditMatchDetailsInput{
    field: String
    appointment: AppointmentInput 
    needsRef: Boolean
    playersNumber: Int
}
`