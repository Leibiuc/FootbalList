exports.typeUser = 
    `type User {
        _id: ID!
        user_role: UserRole!
        user_details: PersonalDetails!
        user_type: userType
        token: String
        isLoggedIn: Boolean!
    }`

exports.userPersonalDetails = 
    `type PersonalDetails{
        username: String!
        email: String!
        password: String
        phoneNumber: String!
        lastName: String
        firstName: String        
        dateOfBirth: Date!
        image: String
        location: Location
    }`

exports.user_role = 
`
    enum UserRole{
    SUPER_ADMIN
    SUB_ADMIN
    FIELD_OWNER
    FIELD_ADMIN
    COACH
    PLAYER
    }`

exports.role =
    `type Role{
        player_role: String
        coach_role: String
    }`

