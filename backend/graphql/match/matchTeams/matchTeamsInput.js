exports.matchTeamsInput = `input MatchExistingTeamsInput {
    firstTeam: MatchExistingTeamInput
    secondTeam: MatchExistingTeamInput
}`

exports.matchTeamInput = `input MatchExistingTeamInput {
  teamID: String
  teamPlayers: [String]
  acceptRandomPlayers: Boolean
  
}`

exports.matchLobbyTeamsInput = `input MatchLobbyTeamsInput {
  team1Players: [String]
  team2Players: [String]
}`