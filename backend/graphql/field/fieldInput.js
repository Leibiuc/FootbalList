exports.fieldInput = `input FieldInput {
    location: LocationInput!
    fieldAdministrator: String!
    fieldPage: FieldPageInput
    matchDetails: String!
    disponibility: String!
    services: String!
}`

exports.fieldPageInput = `input FieldPageInput{
    name: String!
    profileImage: String
    gallery: [String]
    reviews:String
    rating: Int
    price: Int
    facilities: [String]
    description: String
    posts: [String]
}`
