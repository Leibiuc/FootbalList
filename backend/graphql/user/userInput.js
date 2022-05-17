exports.userPersonalDetailsInput = `input PersonalDetailsInput {
    username: String!
    email: String!
    password:String!
    phoneNumber: String!
    lastName: String
    firstName: String
    dateOfBirth: Date!
    image: String
    location: LocationInput
}`

exports.userPersonalDetailsUpdateInput = `
input PersonalDetailsUpdateInput {
    _id: String
    username: String
    phoneNumber: String
    lastName: String
    firstName: String
    image: String
    location: LocationInput
}
`

exports.userInput = `input UserInput {
    personal_details_input: PersonalDetailsInput!
    user_role: UserRole!
    user_type: PlayerInput
}`

exports.coachInitInput = `input CoachInitInput {
    personal_details_input: PersonalDetailsInput!
    user_role: UserRole!
    user_type: CoachInput
}`

exports.fieldOwnerInitInput = `input FieldOwnerInitInput {
    personal_details_input: PersonalDetailsInput!
    user_role: UserRole!
    user_type: FieldOwnerInput
}`

exports.updatePassword =
`input UpdatePassword{
    _id: String!
    newPassword: String!
    checkPassword: String!
}
`

exports.addFriendInput = 
`
    input AddFriendInput{
        user_id: String!
        friend_id: String!
    }
`