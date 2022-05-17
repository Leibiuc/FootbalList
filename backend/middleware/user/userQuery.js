const User = require('../../models/user');

exports.users = () =>  {
    return User
        .find()
        .then(users => {
            return users.map(user => {
                //user.user_details.dateOfBirth = user.user_details.dateOfBirth.toISOString();
                return{...user._doc, _id: user._doc._id.toString()};
            });
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getUserByID = async(args) => {
    let existingUser = null;
    try{
        existingUser = await User.findById(args._id);
        if(existingUser !== undefined && existingUser !== null)
            existingUser.user_details.password = null;  
        return existingUser;
    }catch(err){
        console.log(err);
        return(err);
    }
};

exports.getUsersByCurentForm = async(args) => {
    let existingUsers = [];
    try{
        existingUsers = await User.find({'user_type.curentForm' : args.currentForm});
        existingUsers.map(user => {
            user.user_details.password = null;
            return user;
        });
        return existingUsers;
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.doesUserHavePromotion = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.removePromotionInput.user_id)){
            existingUser = await User.findById(args.removePromotionInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                //Must implement a true criterium to remove it once
                //the promotions are fully implemented!

                let checkPromotions = existingUser.user_type.moneyZone.promotions
                .map((promition) => {
                    if(promition.tbi.toString() !== args.removePromotionInput.criterium.toString())
                        return false;
                    return true;
                });
                console.log(checkPromotions);

                if(checkPromotions.includes(true))
                    return true;

                return false;
            }
            return false;
        } 
        return false;
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.getUsersByUserRole = async(args) => {
    return User
    .find({user_role : args.role})
    .then(users => {
        return users.map(user => {
            return{...user._doc, _id: user._doc._id.toString()};
        });
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
}

exports.getPlayersOrCoaches = async() => {
    try{
        const existingCoach = await User.find({user_role: "COACH"});
        const existingPlayer = await User.find({user_role: "PLAYER"});

        const existingUsers = existingPlayer.concat(existingCoach);
        existingUsers.map(user => {
            user.user_details.password = null;
            return user;
        });
        return existingUsers;
    }catch(err){
        console.log(err);
        return err;
    }
};


exports.getAllButPlayersAndCoaches = async() => {
    try{
        const existingSuperAdmins = await User.find({user_role: "SUPER_ADMIN"});
        const existingSubAdmins = await User.find({user_role: "SUB_ADMIN" });
        const existingFieldOwners = await User.find({user_role: "FIELD_ADMIN"});
        const existingFieldAdministrators = await User.find({user_role: "FIELD_OWNER"});

        const existingUsers = existingSuperAdmins.concat(existingSubAdmins.concat(existingFieldOwners.concat(existingFieldAdministrators)));
        existingUsers.map(user => {
            user.user_details.password = null;
            return user;
        });
        return existingUsers;
    }catch(err){
        console.log(err);
        return err;
    }
};