exports.fileInput = 
`input FileInput{
    filename: String!
    mimetype: String!
    encoding: String!
}`

exports.locationInput =
`input LocationInput{
    longitude: String!
    latitude: String!
    country: String!
    county: String!
    city: String!
    address: String!
}`

exports.achivement =`
input AchivementInput{
    name: String!
    image: String
    date: String
    role: String
    goal: Int!
    progress: Int
    reward: String!
}` 

exports.updateAchivement = 
`input UpdateAchivementInput{
    progress: Int
}`

exports.activity = 
`input ActivityInput{
    start_hour: String!
    end_hour: String!
    week_days: [String!]
    no_days: Int!
    no_weeks: Int!
    no_mounths: Int!
}
`
exports.appointment = 
`input AppointmentInput{
    day: String
    start: String
    end: String
}   
`

exports.chatInput = 
`
    input ChatInput{
        name : String!
        messages : [MessageInput]
        participants: [ParticipantsInput]
    }
`

exports.messageInput = 
`
    input MessageInput{
        user_id : String!
        message : String!
        date: Date
        _id: String
    }
`

exports.participantsInput = 
`
    input ParticipantsInput{
        id: String
        name: String
    }
`

exports.ticketsInput = 
`
    input TicketsInput{
        ticketsSent: [TicketInput]
        ticketsReceived: [TicketInput]
    }
`

exports.ticketInput = 
`
    input TicketInput{
        name: String
        message: String
        user_id: String
        typeOfTicket: TypeOfTicket
    }
`