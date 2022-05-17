const types = require('./userTypes');
const input = require('./userInput');
const player = require('./player/index');
const coach = require('./coach/index');
const fieldOwner = require('./fieldOwner/index');


const userTypeUnion = `union userType = PlayerType | CoachType | FieldOwnerType`;

module.exports = {
    types,
    input,
    player,
    coach,
    fieldOwner,
    userTypeUnion,
}