exports.fieldOwnerType = 
`
    type FieldOwnerType{
        moneyZone: MoneyZoneFieldOwnerType
        fields: [String!]
        employees: [String!]
        tickets: TicketsType
        statistics: [StatisticsType]
        chats: [Chat]
        businessDetails: BusinessDetailsType
    }
`

exports.moneyZoneFieldOwnerType = 
`
    type MoneyZoneFieldOwnerType{
        currentMoney: Float
        bills: [BillType]
        transactions: [TransactionsType]
    }
`

exports.billType = 
`
    type BillType{
        billName: String
        billDetails: BillDetailType
        billValue: Float
    }
`

exports.billDetailType = 
`
    type BillDetailType{
        tbi: String
    }
`

exports.transactionsType = 
`
    type TransactionsType{
        transactionName: String
        transactionDetails: TransactionDetailsType
        transactionValue: Float
    }
`

exports.transactionDetailsType = 
`
    type TransactionDetailsType{
        tbi: String
    }
`

exports.statisticsType = 
`
    type StatisticsType{
        tbi: String
    }
`



exports.businessDetailsType = 
`
    type BusinessDetailsType{
        companyName: String
        registeredOfficeAddress: String
        cif: String
        registrationNumberAtRC: String
        bank: String
        iban: String
        contactPeople: [ContactPersonType]
        companyFax: String
        companyWebSite: String
        companyPhone: String
        companyEmail: String
    }
`

exports.contactPersonType = 
`
    type ContactPersonType{
        name: String
        phoneNumber: String
        email: String
    }
`