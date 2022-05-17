exports.fieldOwnerInput = 
`
    input FieldOwnerInput{
        moneyZone: MoneyZoneFieldOwnerInput
        fields: [String!]
        employees: [String!]
        tickets: TicketsInput
        statistics: [StatisticsInput]
        chats: [ChatInput]
        businessDetails: BusinessDetailsInput
    }
`

exports.moneyZoneFieldOwnerInput = 
`
    input MoneyZoneFieldOwnerInput{
        currentMoney: Float
        bills: [BillInput]
        transactions: [TransactionsInput]
    }
`

exports.billInput = 
`
    input BillInput{
        billName: String
        billDetails: BillDetailInput
        billValue: Float
    }
`

exports.billDetailInput = 
`
    input BillDetailInput{
        tbi: String
    }
`

exports.transactionsInput = 
`
    input TransactionsInput{
        transactionName: String
        transactionDetails: TransactionDetailsInput
        transactionValue: Float
    }
`

exports.transactionDetailsInput = 
`
    input TransactionDetailsInput{
        tbi: String
    }
`

exports.statisticsInput = 
`
    input StatisticsInput{
        tbi: String
    }
`



exports.businessDetailsInput = 
`
    input BusinessDetailsInput{
        companyName: String
        registeredOfficeAddress: String
        cif: String
        registrationNumberAtRC: String
        bank: String
        iban: String
        contactPeople: [ContactPersonInput]
        companyFax: String
        companyWebSite: String
        companyPhone: String
        companyEmail: String
    }
`


exports.businessDetailsEditInput = 
`
    input BusinessDetailsEditInput{
        companyName: String
        registeredOfficeAddress: String
        bank: String
        iban: String
        companyFax: String
        companyWebSite: String
        companyPhone: String
        companyEmail: String
    }
`


exports.contactPersonInput = 
`
    input ContactPersonInput{
        name: String
        phoneNumber: String
        email: String
    }
`

exports.addMoneyInput= 
`
    input AddMoneyInput{
        user_id: String!
        money: Float!
    }
`

exports.addBillFieldOwnerInput =
`
    input AddBillFieldOwnerInput{
        user_id: String
        bill: BillInput
    }
`

exports.removeBillFieldOwnerInput = 
`
    input RemoveBillFieldOwnerInput{
        user_id: String
        index: Int
    }
`

exports.addTransactionFieldOwnerInput = 
`
    input AddTransactionFieldOwnerInput{
        user_id: String
        transaction: TransactionsInput
    }
`

exports.addFieldToOwnerInput = 
`
    input AddFieldToOwnerInput{
        user_id: String!
        field_id: String!
    }
`

exports.addEmployeeToFieldOwnerInput = 
`
    input AddEmployeeToFieldOwnerInput{
        user_id: String!
        employee_id: String!
    }
`

exports.addStatisticToFieldOwnerInput =
`
    input AddStatisticToFieldOwnerInput{
        user_id: String!
        statistic: StatisticsInput!
    }
`

exports.removeStatisticFromFieldOwnerInput = 
`
    input RemoveStatisticFromFieldOwnerInput{
        user_id: String!
        index: Int!
    }
`

exports.editStatisticFromFieldOwnerInput = 
`
    input EditStatisticFromFieldOwnerInput{
        user_id: String!
        index: Int!
        statistic: StatisticsInput!
    }
`

exports.editBusinessDetailsFieldOwnerIntput = 
`
    input EditBusinessDetailsFieldOwnerIntput{
        user_id: String!
        details: BusinessDetailsEditInput
    }
`

exports.addTicketFieldOwnerInput = 
`
    input AddTicketFieldOwnerInput{
        sender_id: String
        receiver_id: String
        ticket: TicketInput
    }
`

exports.changeSolvedTicketFieldOwnerInput =
`
    input ChangeSolvedTicketFieldOwnerInput{
        user_id: String
        id: String
    }
`

exports.addContactPersonInFieldOwnerInput = 
`
    input AddContactPersonInFieldOwnerInput{
        user_id: String
        contactPerson: ContactPersonInput
    }
`

exports.removeContactPersonFromFieldOwnerInput = 
`
    input RemoveContactPersonFromFieldOwnerInput{
        user_id: String
        index: Int
    }
`

exports.editContactPersonFromFieldOwnerInput =
`
    input EditContactPersonFromFieldOwnerInput{
        user_id: String
        index: Int
        contactPerson: ContactPersonInput
    }
`

exports.addChatFieldOwnerInput =
`
    input AddChatFieldOwnerInput{
        participant1: ParticipantsInput
        participant2: ParticipantsInput
    }
`

exports.changeNameInChatFieldOwnerInput = 
`
    input ChangeNameInChatFieldOwnerInput{
        user_id: String
        chat_id: String
        participant_id: String
        name: String
    }
`

exports.addMessageInFieldOwnerInput = 
`
    input AddMessageInFieldOwnerInput{
        user_id: String
        chat_id: String
        message: String
    }
`

exports.removeMessageInFieldOwnerInput = 
`
    input RemoveMessageInFieldOwnerInput{
        user_id: String
        chat_id: String
        index: Int
    }
`

exports.clearAllMessagesInFieldOwnerInput = 
`
    input ClearAllMessagesInFieldOwnerInput{
        user_id: String
        chat_id: String
    }
`