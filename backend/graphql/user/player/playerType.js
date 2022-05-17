exports.playerType = 
`
type PlayerType{
    moneyZone: MoneyZoneType
    achivements: PlayerAchivements
    globalRating: String
    reviews: [ReviewTypePlayer]
    curentForm: CurrentForm
    trainings: [String]
    matches: [String]
    friends: [String]
    blocked: BlockType
}
`

exports.blockType = 
`
type BlockType{
    peopleIBlocked : [String]
    peopleThatBlockedMe: [String]
}
`

exports.moneyZoneType = 
`
type MoneyZoneType{
    tokens: Int
    promotions: [PromotionsType]
    vouchers: VouchersType
    transactionHistory: [TransactionHistoryType]
}
`

exports.vouchersType = 
`
type VouchersType{
    transactionsVouchers: [TransactionsVouchersType]
    expensesVouchers: [ExpensesVouchersType]
}
`

exports.promotionsType = 
`
type PromotionsType{
    tbi: String
}
`

exports.transactionHistoryType = 
`
type TransactionHistoryType{
    tbi: String
}
`

exports.transactionsVouchersType = 
`
type TransactionsVouchersType{
    date: String!
    name: String!
    percent: Int!
}
`

exports.expensesVouchersType = 
`
type ExpensesVouchersType{
    date: String!
    name: String!
    percent: Int!
}
`

exports.currentForm = 
`
    enum CurrentForm {
        JUNIOR
        SEMI_PRO
        PRO
        ADDICTED
        GOD_AMONG_US 
    }`


exports.playerAchivements =
`
    type PlayerAchivements{
        points : Int!
        badges: [BadgeType]
        level: LevelType!
        achivements: [Achivement]
    }
`
exports.badgeType = 
`
type BadgeType{
    tbi: String
}
`

exports.levelType = 
`
type LevelType{
    tbi: String
}
`

exports.reviewPLayerType = 
`
    type ReviewTypePlayer{
        criterium: CriteriumType
        avarage: Float
        noReviewers: Int
    }
`

exports.criteriumType = 
`
type CriteriumType{
    tbi: String
}
`