
exports.typeField = 
    `type Field {
        _id: ID!
        location: Location!
        fieldAdministrator: String!
        fieldPage: String
        matchDetails: String!
        disponibility: String
        services: [String]
        statistics: String
}`

exports.typeFieldPage = 
    `type FieldPage {
        name: String!
        profileImage: String
        gallery: [String]
        reviews: FieldReview
        rating: Int
        price: FieldPrice
        facilities: [String]
        description: String
        posts: [String]
}`


//not ready