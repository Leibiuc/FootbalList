exports.matchTeamsType = `type MatchTeams {
    firstTeam: MatchTeam
    secondTeam: MatchTeam
}`

exports.matchTeamType = `type MatchTeam {
  teamID: String
  teamPlayers: [String]
  acceptRandomPlayers: Boolean
  teamAvatar: String
}`

exports.matchLobyyTeamType = `type MatchLobbyTeams {
  team1Players: [String]
  team2Players: [String]
}`
