exports.playerInput =
`
input PlayerInput{
    moneyZone: MoneyZoneInput
    achivements: PlayerAchivementsInput
    globalRating: String
    reviews: [ReviewPlayerInput]
    curentForm: CurrentForm
    trainings: [String]
    matches: [String]
    friends: [String]
    blocked: BlockInput
}
`

exports.blockInput = 
`
input BlockInput{
    peopleIBlocked : [String]
    peopleThatBlockedMe: [String]
}
`


exports.moneyZoneInput = 
`
input MoneyZoneInput{
    tokens: Int
    promotions: [PromotionsInput!]
    vouchers: VouchersInput!
    transactionHistory: [TransactionHistoryInput!]
}
`

exports.vouchersInput = 
`
input VouchersInput{
    transactionsVouchers: [TransactionsVouchersInput!]
    expensesVouchers: [ExpensesVouchersInput!]
}
`

exports.promotionsInput = 
`
input PromotionsInput{
    tbi: String
}
`

exports.transactionHistoryInput = 
`
input TransactionHistoryInput{
    tbi: String
}
`

exports.transactionsVouchersInput = 
`
input TransactionsVouchersInput{
    date: String!
    name: String!
    percent: Int!
}
`

exports.expensesVouchersInput = 
`
input ExpensesVouchersInput{
    date: String!
    name: String!
    percent: Int!
}
`

exports.playerAchivementsInput =
`
    input PlayerAchivementsInput{
        points : Int!
        badges: [BadgeInput]
        level: LevelInput!
        achivements: [AchivementInput]
    }
`
exports.badgeInput = 
`
input BadgeInput{
    tbi: String
}
`

exports.levelInput = 
`
input LevelInput{
    tbi: String
}
`

exports.reviewPlayerInput = 
`
input ReviewPlayerInput{
        criterium: CriteriumInput
        avarage: Float
        noReviewers: Int
    }
`

exports.criteriumInput = 
`
input CriteriumInput{
    tbi: String
}
`

exports.addTokensInput = 
`
    input AddTokensInput{
        user_id: String!
        tokens: Int!
    }
`

exports.addPromotionInput = 
`
    input AddPromotionInput{
        user_id: String!
        promotion: PromotionsInput!
    }
`

exports.removePromotionInput =
`
    input RemovePromotionInput{
        user_id: String!
        criterium: String!
    }
`

exports.addTransactionVoucherInput = 
`
    input AddTransactionVoucherInput{
        user_id: String!
        voucher: TransactionsVouchersInput!
    }
`
exports.removeVoucherInput = 
`
    input RemoveVoucherInput{
        user_id: String!
        criterium: String!
    }
`

exports.changeCurrentFormInput =
`
    input ChangeCurrentFormInput{
        user_id: String!
        form: CurrentForm!
    }
`

exports.reviewUserInput = 
`
    input ReviewUserInput{
        user_id: String!
        review: ReviewPlayerInput
    }
`

exports.updateReviewUserInput =
`
    input UpdateReviewUserInput{
        user_id: String!
        criterium: CriteriumInput!
        mark: Int!
    }
`

exports.addTrainingUserInput = 
`
    input AddTrainingUserInput{
        user_id: String!
        training_id: String! 
    }
`
