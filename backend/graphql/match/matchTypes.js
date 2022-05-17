exports.matchType = `type Match {
    creator: String!
    participants: participantsType
    matchDetails: MatchDetails!
    chat: Chat
    mediaGallery: [String]
    statistics: MatchStatistics
    status: Boolean
    public: Boolean
    minParticipants: Int
}`

exports.matchDetailsType = `type MatchDetails {
    credit: Int!
    appointment: Appointment!
    field: String!
    playersNumber: Int
    needsRef: Boolean
}`

exports.matchStatisticsType = `type MatchStatistics {
  goalsScored: Int
  nameOrganizer: String
  tokensSpent: Int
}`



