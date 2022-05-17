const types = require('./matchTypes');
const input = require('./matchInput');
const matchTeams = require('./matchTeams/index')


const participantsTypeUnion = `union participantsType = MatchTeams | MatchLobbyTeams`;

module.exports = {
    types,
    input,
    matchTeams,
    participantsTypeUnion
}