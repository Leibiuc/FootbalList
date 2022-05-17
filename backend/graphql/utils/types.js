exports.fileType = 
`type File{
    filename: String
    mimetype: String
    encoding: String
}`

exports.locationType =
`type Location{
    longitude: String
    latitude: String
    country: String
    county: String
    city: String
    address: String
}`

exports.achivement =
`type Achivement{
    name: String!
    image: String
    date: String
    role: String
    goal: Int
    progress: Int
    reward: String!
}` 


exports.activity = 
`type Activity{
    start_hour: String!
    end_hour: String!
    week_days: [String!]
    no_days: Int!
    no_weeks: Int!
    no_mounths: Int!
}
`

exports.appointment = 
`type Appointment{
    day: String
    start: Date
    end: Date
}   
`

exports.chatType = 
`
    type Chat{
        name : String!
        participants: [ParticipantsType]
        messages : [MessageType]
    }
`

exports.participantsType = 
`
    type ParticipantsType{
        id: String
        name: String
    }
`

exports.messageType = 
`
    type MessageType{
        name : String!
        message : String!
        date: Date
    }
`


exports.ticketsType = 
`
    type TicketsType{
        ticketsSent: [TicketType]
        ticketsReceived: [TicketType]
    }
`

exports.ticketType = 
`
    type TicketType{
        id: String
        name: String
        message: String
        user_id: String
        typeOfTicket: TypeOfTicket
        resolved: Boolean
    }
`

exports.typeOfTicket = 
`
    enum TypeOfTicket {
        COMPLAINT
        BUG
        IDEEA
        URGENT_MESSAGE
        DEV_ASSISTANCE_NEEDED
    }
`