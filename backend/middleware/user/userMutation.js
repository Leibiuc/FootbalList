const User = require('../../models/user');
const Training = require('../../models/training');
const ObjectId = require('mongoose').Types.ObjectId;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const team = require('../../models/team');


exports.login = async(args) => {
    let existingUser;
    try{
        existingUser = await User.findOne({'user_details.username' : args.user_name})
        if(existingUser !== undefined && existingUser !== null)
        {
            isValidPassword = await bcrypt.compare(args.user_password, existingUser.user_details.password);
            if(isValidPassword){
                newToken = jwt.sign({ userID: existingUser._id, name: existingUser.user_details.username }, 'super_secret', { expiresIn: '1h' });
                const user = new User({
                    user_details: {
                        username: existingUser.user_details.username,
                        email: existingUser.user_details.email,
                        password: null,
                        phoneNumber: existingUser.user_details.phoneNumber,
                        lastName: existingUser.user_details.lastName,
                        firstName: existingUser.user_details.firstName,       
                        dateOfBirth: existingUser.user_details.dateOfBirth,
                        image: existingUser.user_details.image,
                        location: existingUser.user_details.location,
                    },
                    user_role: existingUser.user_role,
                    token: newToken,
                    isLoggedIn: true,
                    });
                existingUser.isLoggedIn = true;
                await existingUser.save();
                return user;
        }
        }
        return null;
    } catch(err){ console.log(err)}
};

exports.addFriendPlayer = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addFriendInput.user_id))
        {
            existingUser = await User.findById(args.addFriendInput.user_id);

            if(existingUser !== null && existingUser !== undefined)
            {
                if(ObjectId.isValid(args.addFriendInput.friend_id)){

                    await existingUser.user_type.friends.push(args.addFriendInput.friend_id);
                    
                    const friends = existingUser.user_type.friends;

                    if(args.addFriendInput.user_id === args.addFriendInput.friend_id)
                        return "However lonely you feel I can't in good conscience let you add yourself as a friend!";

                    if(friends.includes(args.addFriendInput.friend_id))
                        return "Friend already in the list!";

                    await existingUser.markModified('user_type.friends');
                    await existingUser.save();

                    return "Friend added!";
                }
                return "Not a valid friend ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.logout = async(args) => {
    let existingUser;
    try{
        existingUser = await User.findById(args.user_id);
        if(existingUser !== undefined && existingUser !== null){
            existingUser.isLoggedIn = false;

            await existingUser.save();

            return "User logged out!";
        }
        return "Somehow you don't exist";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.createUser = async(args) => {
    const hashedPassword = await bcrypt.hash(args.userInput.personal_details_input.password, 5);
    const user = new User({
        user_details: {
            username: args.userInput.personal_details_input.username,
            email: args.userInput.personal_details_input.email,
            password: hashedPassword,
            phoneNumber: args.userInput.personal_details_input.phoneNumber,
            lastName: args.userInput.personal_details_input.lastName,
            firstName: args.userInput.personal_details_input.firstName,       
            dateOfBirth: new Date(args.userInput.personal_details_input.dateOfBirth),
            image: args.userInput.personal_details_input.image,
            location: args.userInput.personal_details_input.location,
        },
        user_role: args.userInput.user_role,
        user_type: args.userInput.user_type,
        isLoggedIn: false,
    });
    return user
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.createCoach = async(args) => {
    const hashedPassword = await bcrypt.hash(args.userInput.personal_details_input.password, 5);
    const user = new User({
        user_details: {
            username: args.userInput.personal_details_input.username,
            email: args.userInput.personal_details_input.email,
            password: hashedPassword,
            phoneNumber: args.userInput.personal_details_input.phoneNumber,
            lastName: args.userInput.personal_details_input.lastName,
            firstName: args.userInput.personal_details_input.firstName,       
            dateOfBirth: new Date(args.userInput.personal_details_input.dateOfBirth),
            image: args.userInput.personal_details_input.image,
            location: args.userInput.personal_details_input.location,
        },
        user_role: args.userInput.user_role,
        user_type: args.userInput.user_type,
        isLoggedIn: false,
    });
    return user
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.createFieldOwner = async(args) => {
    const hashedPassword = await bcrypt.hash(args.userInput.personal_details_input.password, 5);
    const user = new User({
        user_details: {
            username: args.userInput.personal_details_input.username,
            email: args.userInput.personal_details_input.email,
            password: hashedPassword,
            phoneNumber: args.userInput.personal_details_input.phoneNumber,
            lastName: args.userInput.personal_details_input.lastName,
            firstName: args.userInput.personal_details_input.firstName,       
            dateOfBirth: new Date(args.userInput.personal_details_input.dateOfBirth),
            image: args.userInput.personal_details_input.image,
            location: args.userInput.personal_details_input.location,
        },
        user_role: args.userInput.user_role,
        user_type: args.userInput.user_type,
        isLoggedIn: false,
    });
    return user
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.deleteUser = async(args) => {
    let existingUser;
    try{
        existingUser = await User.findById(args._id);        
        if(existingUser !== undefined && existingUser !== null)
        {
            
            await existingUser.remove();
            return "User removed successfuly!";
        
        }
        return "User not found!";
    } catch(err){
        console.log(err);
        return err;
    }
};

exports.updateUserDetails = async(args) => {
    let existingUser;
    try{
        existingUser = await User.findById(args.personalDetailsUpdateInput._id);
        if(existingUser !== undefined && existingUser !== null){
            if(args.personalDetailsUpdateInput.username)
                existingUser.user_details.username = args.personalDetailsUpdateInput.username;
            if(args.personalDetailsUpdateInput.phoneNumber)
                existingUser.user_details.phoneNumber = args.personalDetailsUpdateInput.phoneNumber;
            if(args.personalDetailsUpdateInput.lastName)
                existingUser.user_details.lastName = args.personalDetailsUpdateInput.lastName;
            if(args.personalDetailsUpdateInput.firstName)
                existingUser.user_details.firstName = args.personalDetailsUpdateInput.firstName;
            if(args.personalDetailsUpdateInput.image)
                existingUser.user_details.image = args.personalDetailsUpdateInput.image;
            if(args.personalDetailsUpdateInput.location)
                existingUser.user_details.location = args.personalDetailsUpdateInput.location;

            await existingUser.save();
            return "User updated";
        }

        return "User not found!";
        
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.updatePassword = async(args) => {
    let existingUser;
    try{
        existingUser = await User.findById(args.updatePassword._id);
        if(existingUser !== undefined && existingUser !== null){
            const isValidPassword = await bcrypt.compare(args.updatePassword.checkPassword, existingUser.user_details.password);
            const isSame = await bcrypt.compare(args.updatePassword.newPassword, existingUser.user_details.password);
            const newHashedPassword = await bcrypt.hash(args.updatePassword.newPassword, 5);

            if(!isValidPassword)
                return "Wrong Password!";
            
            if(isSame)
                return "New password must be different from the old one!";

            existingUser.user_details.password = newHashedPassword;

            await existingUser.save();
            return "Password updated!";
        }
        return "Somehow you don't exist!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.resetPassword = async(args) => {
    let existingUser;
    try{
        existingUser = await User.findOne({'user_details.email' : args.email})

        if(existingUser !== undefined && existingUser !== null)
        {
            let newPassword = await bcrypt.hash(existingUser.user_details.password.substring(45, 59), 5);
            newPassword = newPassword.substring(25, 33);
            console.log(newPassword);
            const newHashedPassword = await bcrypt.hash(newPassword, 5);
            existingUser.user_details.password = newHashedPassword;

            await existingUser.save();

            //here we will send the password trought mail

            return "Reset password sent successfully!";
        }
        return "No user with that email address exists!";
    }catch(err){
        console.log(err);
        return err;
    }

};

exports.addFriendPlayer = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addFriendInput.user_id))
        {
            existingUser = await User.findById(args.addFriendInput.user_id);

            if(existingUser !== null && existingUser !== undefined)
            {
                if(ObjectId.isValid(args.addFriendInput.friend_id)){

                    let friendUser = await User.findById(args.addFriendInput.friend_id);

                    if(friendUser !== null && friendUser !== undefined){
                        
                        if(existingUser.user_type.friends.includes(args.addFriendInput.friend_id))
                            return "Friend already in the list!";
                        
                        await existingUser.user_type.friends.push(args.addFriendInput.friend_id);
                        await friendUser.user_type.friends.push(args.addFriendInput.user_id);
                        
                        if(args.addFriendInput.user_id === args.addFriendInput.friend_id)
                            return "However lonely you feel I can't in good conscience let you add yourself as a friend!";
                        
                        
                        existingUser.markModified('user_type.friends');
                        await existingUser.save();

                        friendUser.markModified('user_type.friends');
                        await friendUser.save();
                        
                        
                        return "Friend added!";
                    }
                    return "User Friend does not exist!"
                }
                return "Not a valid friend ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeFriendPlayer = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addFriendInput.user_id)){

            existingUser = await User.findById(args.addFriendInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(ObjectId.isValid(args.addFriendInput.friend_id)){

                    let friendUser = await User.findById(args.addFriendInput.friend_id);

                    if(friendUser !== null && friendUser !== undefined){

                        existingUser.user_type.friends = existingUser.user_type.friends
                        .filter(friend => friend.toString() !== args.addFriendInput.friend_id.toString())
                        
                        
                        friendUser.user_type.friends = friendUser.user_type.friends
                        .filter(friend => friend.toString() !== args.addFriendInput.user_id.toString())

                        await existingUser.markModified('user_type.friends');
                        await existingUser.save();

                        await friendUser.markModified('user_type.friends');
                        await friendUser.save();
                        
                        return "Friend removed!";
                    }
                    return "User Friend not found!";
                }
                return "Not a valid friend ID!";
            }
            return "User does not exist!"
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }

};

exports.blockSomeone = async(args) => {
    let blocker, blocked; 
    try{
        if(ObjectId.isValid(args.addFriendInput.user_id)){

            blocker = await User.findById(args.addFriendInput.user_id);

            if(blocker !== null && blocker !== undefined){
                if(ObjectId.isValid(args.addFriendInput.friend_id)){

                    blocked = await User.findById(args.addFriendInput.friend_id);

                    if(blocked !== null && blocker !== undefined){
                        if(args.addFriendInput.user_id === args.addFriendInput.friend_id)
                            return "However self loathing you feel I can't in good conscience let you block yourself!";
                        
                        if(blocker.user_type.blocked.peopleIBlocked.includes(args.addFriendInput.friend_id))
                            return "Person already blocked!";

                        blocker.user_type.blocked.peopleIBlocked.push(args.addFriendInput.friend_id);
                        blocked.user_type.blocked.peopleThatBlockedMe.push(args.addFriendInput.user_id);

                        blocker.markModified('user_type.blocked.peopleIBlocked');
                        blocked.markModified('user_type.blocked.peopleThatBlockedMe');
                        await blocker.save();
                        await blocked.save();                


                        return "Person blocked!";
                    }
                    return "User Blocked not found!";
                }
                return "Not a valid blocked ID!";
            }
            return "User Blocker not found!";
        }
        return "Not a valid Blocker ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.unblockSomeone = async(args) => {
    let unblocker, unblocked; 
    try{
        if(ObjectId.isValid(args.addFriendInput.user_id)){
            
            unblocker = await User.findById(args.addFriendInput.user_id);
            
            if(unblocker !== null && unblocker !== undefined){
                if(ObjectId.isValid(args.addFriendInput.friend_id)){
                    unblocked = await User.findById(args.addFriendInput.friend_id);
                    
                    if(unblocked !== null && unblocked !== undefined){

                        unblocker.user_type.blocked.peopleIBlocked = unblocker.user_type.blocked.peopleIBlocked
                        .filter(person => person.toString() !== args.addFriendInput.friend_id.toString());
                        
                        unblocked.user_type.blocked.peopleThatBlockedMe = unblocked.user_type.blocked.peopleThatBlockedMe
                        .filter(person => person.toString() !== args.addFriendInput.user_id.toString());

                        unblocker.markModified('user_type.blocked.peopleIBlocked');
                        unblocked.markModified('user_type.blocked.peopleThatBlockedMe');
                        await unblocker.save();
                        await unblocked.save();    

                        return "Person unblocked!";
                    }
                    return "User Unblocked not found!";
                }
                return "Not a valid Unblocked ID!";
            }
            return "User Unblocker not found!";
        }
        return "Not a valid Unblocker ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addTokens = async(args) => {
    let existingUser;
    let cond = true;
    try{
        if(ObjectId.isValid(args.addTokensInput.user_id)){

            existingUser = await User.findById(args.addTokensInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(!cond)
                    return "Something went wrong with the payment!";

                existingUser.user_type.moneyZone.tokens += args.addTokensInput.tokens;
            
                await existingUser.markModified('user_type.moneyZone.tokens');

                await existingUser.save();

                return "Tokens added!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeTokens = async(args) => {
    let existingUser;
    let cond = true;
    try{
        if(ObjectId.isValid(args.addTokensInput.user_id)){
            existingUser = await User.findById(args.addTokensInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(!cond)
                    return "Something went wrong with the payment!";
                
                if(existingUser.user_type.moneyZone.tokens - args.addTokensInput.tokens < 0)
                    return "Not enough founds!";

                existingUser.user_type.moneyZone.tokens -= args.addTokensInput.tokens;

                await existingUser.markModified('user_type.moneyZone.tokens');

                await existingUser.save();

                return "Tokens removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addNewPromotion = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addPromotionInput.user_id)){
            existingUser = await User.findById(args.addPromotionInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                existingUser.user_type.moneyZone.promotions.push(args.addPromotionInput.promotion);

                await existingUser.markModified('user_type.moneyZone.promotions');

                await existingUser.save();

                return "Promotion added!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeExistingPromotion = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.removePromotionInput.user_id)){
            existingUser = await User.findById(args.removePromotionInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                //Must implement a true criterium to remove it once
                //the promotions are fully implemented!
                existingUser.user_type.moneyZone.promotions = existingUser.user_type.moneyZone.promotions
                .filter(promition => promition.tbi.toString() !== args.removePromotionInput.criterium.toString());
                
                await existingUser.markModified('user_type.moneyZone.promotions');
                await existingUser.save();
                
                return "Promotion removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addVoucherTransactionUser = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addTransactionVoucherInput.user_id)){
            existingUser = await User.findById(args.addTransactionVoucherInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                    existingUser.user_type.moneyZone.vouchers.transactionsVouchers.push(args.addTransactionVoucherInput.voucher);

                    await existingUser.markModified('user_type.moneyZone.vouchers.transactionsVouchers');

                    existingUser.save();

                    return "Voucher added!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeVoucherTransactionUser = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.removeVoucherInput.user_id)){
            existingUser = await User.findById(args.removeVoucherInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                existingUser.user_type.moneyZone.vouchers.transactionsVouchers = existingUser.user_type.moneyZone.vouchers.transactionsVouchers
                .filter(voucher => voucher.name.toString() !== args.removeVoucherInput.criterium.toString());

                await existingUser.markModified('user_type.moneyZone.vouchers.transactionsVouchers');
                await existingUser.save();

                return "Voucher removed!";
            }return "User does not exist!"
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addVoucherExpenseUser = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addTransactionVoucherInput.user_id)){
            existingUser = await User.findById(args.addTransactionVoucherInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.moneyZone.vouchers.expensesVouchers.push(args.addTransactionVoucherInput.voucher);

                await existingUser.markModified('user_type.moneyZone.vouchers.expensesVouchers');

                await existingUser.save();

                return "Voucher added!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeVoucherExpenseUser = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.removeVoucherInput.user_id)){
            existingUser = await User.findById(args.removeVoucherInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                existingUser.user_type.moneyZone.vouchers.expensesVouchers = existingUser.user_type.moneyZone.vouchers.expensesVouchers
                .filter(voucher => voucher.name.toString() !== args.removeVoucherInput.criterium.toString()); 

                await existingUser.markModified('user_type.moneyZone.vouchers.expensesVouchers');
                await existingUser.save();

                return "Voucher removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.changeCurrentFormUser = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.changeCurrentFormInput.user_id))
        {
            existingUser = await User.findById(args.changeCurrentFormInput.user_id);
            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.curentForm = args.changeCurrentFormInput.form;

                await existingUser.markModified('user_type.curentForm');
                await existingUser.save();

                return "Form changed!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addReviewUser = async(args) => {
    let existingUser;
    
    try{
        if(ObjectId.isValid(args.reviewUserInput.user_id)){
            existingUser = await User.findById(args.reviewUserInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.reviews.push(args.reviewUserInput.review);

                await existingUser.markModified('user_type.reviews');
                await existingUser.save();

                return "Review Added!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.updateReviewUser = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.updateReviewUserInput.user_id)){
            existingUser = await User.findById(args.updateReviewUserInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.reviews.filter(review => {
                    if(review.criterium.tbi.toString() === args.updateReviewUserInput.criterium.tbi.toString()){
                        review.avarage = (review.avarage * review.noReviewers + args.updateReviewUserInput.mark) / (review.noReviewers + 1);
                        review.noReviewers += 1;
                    }
                    return review;
                });

                await existingUser.markModified('user_type.reviews');
                await existingUser.save();

                return "Review updated!";
            }
            return "User does not exist!"
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addNewTraining = async(args) => {
    let existingUser;
    // console.log(args)
    try{
        if(ObjectId.isValid(args.addTrainingUserInput.user_id)){

            existingUser = await User.findById(args.addTrainingUserInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                if(ObjectId.isValid(args.addTrainingUserInput.training_id)){


                    if(Training.findById(args.addTrainingUserInput.training_id)){
                        if(existingUser.user_type.trainings.includes(args.addTrainingUserInput.training_id))
                            return "Training already added!";
                        existingUser.user_type.trainings.push(args.addTrainingUserInput.training_id);

                        existingUser.markModified('user_type.trainings');


                        // res = await training.addTrainee(addTraineeInput = {
                        //     _id: args.addTrainingUserInput.training_id,
                        //     trainee: args.addTrainingUserInput.training_id,
                        // });

                        await existingUser.save();

                        return "Training saved!";// + res;
                    }
                    return "Training does not exist!";
                }
                return "Not a valid training ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeTraining = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addTrainingUserInput.user_id)){
            existingUser = await User.findById(args.addTrainingUserInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(ObjectId.isValid(args.addTrainingUserInput.training_id)){
                    if(Training.findById(args.addTrainingUserInput.training_id)){
                        if(!existingUser.user_type.trainings.includes(args.addTrainingUserInput.training_id))
                            return "Training is not on your list!";
                        existingUser.user_type.trainings = existingUser.user_type.trainings
                        .filter(training => training !== args.addTrainingUserInput.training_id);

                        existingUser.markModified('user_type.trainings');


                        // res = await training.addTrainee(addTraineeInput = {
                        //     _id: args.addTrainingUserInput.training_id,
                        //     trainee: args.addTrainingUserInput.training_id,
                        // });

                        await existingUser.save();

                        return "Training removed!";// + res;
                    }
                    return "Training does not exist!";
                }
                return "Not a valid training ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addCertCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addCertCVInput.user_id)){
            existingUser = await User.findById(args.addCertCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(args.addCertCVInput.cert.name === "") 
                    return "No Name for certificate!";
                if(args.addCertCVInput.cert.date === "")
                    return "No Date for certificate!";
                const validator = existingUser.user_type.cv.cert.map(cert => {
                    if(cert.name === args.addCertCVInput.cert.name && cert.date === args.addCertCVInput.cert.date)
                        return true;
                    return false;
                });
                if(!validator.includes(true)){
                        
                    existingUser.user_type.cv.cert.push(args.addCertCVInput.cert);

                    existingUser.markModified('user_type.cv.cert');

                    existingUser.save();

                    return "Certificate added!";
                }
                return "Certificate already added!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeCertCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.removeCertCVInput.user_id)){

            existingUser = await User.findById(args.removeCertCVInput.user_id);

            if(args.removeCertCVInput.name === "") 
                return "No Name for certificate!";
            if(args.removeCertCVInput.date === "")
                return "No Date for certificate!";

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.cv.cert = existingUser.user_type.cv.cert
                .filter(certificate => certificate.name !== args.removeCertCVInput.name && certificate.date !== args.removeCertCVInput.date);

                existingUser.markModified('user_type.cv.cert');

                existingUser.save();

                return "Certificate Removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addPhotoCertCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addPhotoCertCVInput.user_id)){
            existingUser = await User.findById(args.addPhotoCertCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(existingUser.user_type.cv.cert.length <= args.addPhotoCertCVInput.index)
                    return "Not a valid index!";
                if(args.addPhotoCertCVInput.image === "")
                    return "Not a valid image!";

                
                if(!existingUser.user_type.cv.cert[args.addPhotoCertCVInput.index].certImages.includes(args.addPhotoCertCVInput.image)){

                    existingUser.user_type.cv.cert[args.addPhotoCertCVInput.index].certImages.push(args.addPhotoCertCVInput.image);
                
                    existingUser.markModified(`user_type.cv.cert`);

                    await existingUser.save();

                    return "Image added!";
                }
                return "Image already added!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removePhotoCertCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addPhotoCertCVInput.user_id)){
            existingUser = await User.findById(args.addPhotoCertCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(existingUser.user_type.cv.cert.length <= args.addPhotoCertCVInput.index)
                    return "Not a valid index!";
                if(args.addPhotoCertCVInput.image === "")
                    return "Not a valid image!";

                existingUser.user_type.cv.cert[args.addPhotoCertCVInput.index].certImages = existingUser.user_type.cv.cert[args.addPhotoCertCVInput.index].certImages
                .filter(image => image.toString() !== args.addPhotoCertCVInput.image.toString());
            
                existingUser.markModified(`user_type.cv.cert`);

                await existingUser.save();

                return "Image deleted!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeAllPhotosCertCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.removeAllPhotosCertCVInput.user_id)){
            existingUser = await User.findById(args.removeAllPhotosCertCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(existingUser.user_type.cv.cert.length <= args.removeAllPhotosCertCVInput.index)
                    return "Not a valid index!";

                existingUser.user_type.cv.cert[args.removeAllPhotosCertCVInput.index].certImages = [];
            
                existingUser.markModified(`user_type.cv.cert`);

                await existingUser.save();

                return "Images deleted!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.updateCertCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.updateCertCVInput.user_id)){
            existingUser = await User.findById(args.updateCertCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(existingUser.user_type.cv.cert.length <= args.updateCertCVInput.index)
                    return "Not a valid index!";
                if(args.updateCertCVInput.name !== "")
                    existingUser.user_type.cv.cert[args.updateCertCVInput.index].name = args.updateCertCVInput.name;
                if(args.updateCertCVInput.date !== "")
                    existingUser.user_type.cv.cert[args.updateCertCVInput.index].date = args.updateCertCVInput.date;

                existingUser.markModified('user_type.cv.cert');

                await existingUser.save();

                return "Certificate updated!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addExperienceCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addExperienceCVInput.user_id)){
            existingUser = await User.findById(args.addExperienceCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.cv.experience.push(args.addExperienceCVInput.experience);

                existingUser.markModified('user_type.cv.experience');

                await existingUser.save();

                return "Coach experience added!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeExperienceCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.removeExperienceCVInput.user_id)){
            existingUser = await User.findById(args.removeExperienceCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                if(existingUser.user_type.cv.experience.length <= args.removeExperienceCVInput.index)
                    return "Not a valid index!";
                
                existingUser.user_type.cv.experience = existingUser.user_type.cv.experience
                .filter((item, index) => index !== args.removeExperienceCVInput.index);

                await existingUser.save();
                console.log(existingUser.user_type.cv.experience);

                return "Experience deleted!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.updateExperienceCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.updateExperienceCVInput.user_id)){
            existingUser = await User.findById(args.updateExperienceCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(existingUser.user_type.cv.experience.length > args.updateExperienceCVInput.index){
                    if(args.updateExperienceCVInput.experience.description !== "")
                        existingUser.user_type.cv.experience[args.updateExperienceCVInput.index].description = args.updateExperienceCVInput.experience.description;
                    if(args.updateExperienceCVInput.experience.duration.startDate !== "")
                        existingUser.user_type.cv.experience[args.updateExperienceCVInput.index].duration.startDate = args.updateExperienceCVInput.experience.duration.startDate;
                    if(args.updateExperienceCVInput.experience.duration.endDate !== "")
                        existingUser.user_type.cv.experience[args.updateExperienceCVInput.index].duration.endDate = args.updateExperienceCVInput.experience.duration.endDate;
                    if(args.updateExperienceCVInput.experience.duration.days !== null)
                        existingUser.user_type.cv.experience[args.updateExperienceCVInput.index].duration.days = args.updateExperienceCVInput.experience.duration.days;

                    existingUser.markModified(`user_type.cv.experience`);

                    await existingUser.save();

                    return "Experience updated!";
                }
                return "Not a valid index!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addVideoCV = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addVideoCVInput.user_id)){
            existingUser = await User.findById(args.addVideoCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(args.addVideoCVInput.video === "")
                    return "Not a valid video!";
                if(existingUser.user_type.cv.videos.includes(args.addVideoCVInput.video))
                    return "Video already added!";
                
                existingUser.user_type.cv.videos.push(args.addVideoCVInput.video);

                existingUser.markModified(`user_type.cv.videos`);

                await existingUser.save();

                return "Video saved!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeVideoCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addVideoCVInput.user_id)){
            existingUser = await User.findById(args.addVideoCVInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(args.addVideoCVInput.video === "")
                    return "Not a valid video!";

                existingUser.user_type.cv.videos = existingUser.user_type.cv.videos.filter(video => video !== args.addVideoCVInput.video);

                existingUser.markModified(`user_type.cv.videos`);

                await existingUser.save();

                return "Video removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeAllVideosCV = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.user_id)){
            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.cv.videos = [];

                existingUser.markModified(`user_type.cv.videos`);

                existingUser.save();

                return "Videos deleted!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.changeFormCoach = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.changeFormCoachInput.user_id)){
            existingUser = await User.findById(args.changeFormCoachInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.coachingForm = args.changeFormCoachInput.form;

                existingUser.markModified(`user_type.coachingForm`);

                await existingUser.save();

                return "Form changed!";
            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.createTrainingsCoach = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.createTrainingCoachInput.user_id)){
            existingUser = await User.findById(args.createTrainingCoachInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(!ObjectId.isValid(args.createTrainingCoachInput.training_id))
                    return "Not a valid training ID!";
                
                if(existingUser.user_type.trainings.includes(args.createTrainingCoachInput.training_id))
                    return "Training already added";

                existingUser.user_type.trainings.push(args.createTrainingCoachInput.training_id);

                existingUser.markModified(`user_type.trainings`);

                await existingUser.save();

                return "Training added!";

            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeTrainingCoach = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.createTrainingCoachInput.user_id)){
            existingUser = await User.findById(args.createTrainingCoachInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(!ObjectId.isValid(args.createTrainingCoachInput.training_id))
                    return "Not a valid training ID!";

                existingUser.user_type.trainings = existingUser.user_type.trainings
                .filter(training => training !== args.createTrainingCoachInput.training_id);

                existingUser.markModified(`user_type.trainings`);

                await existingUser.save();

                return "Training removed!";

            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.removeMatchCoach = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addMatchCoachInput.user_id)){
            existingUser = await User.findById(args.addMatchCoachInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(!ObjectId.isValid(args.addMatchCoachInput.match_id))
                    return "Not a valid match ID!";

                existingUser.user_type.matches = existingUser.user_type.matches
                .filter(match => match !== args.addMatchCoachInput.match_id);

                existingUser.markModified(`user_type.matches`);

                await existingUser.save();

                return "Match removed!";

            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.addMatchCoach = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addMatchCoachInput.user_id)){
            existingUser = await User.findById(args.addMatchCoachInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(!ObjectId.isValid(args.addMatchCoachInput.match_id))
                    return "Not a valid match ID!";
                
                if(existingUser.user_type.matches.includes(args.addMatchCoachInput.match_id))
                    return "Match already added";

                existingUser.user_type.matches.push(args.addMatchCoachInput.match_id);

                existingUser.markModified(`user_type.matches`);

                await existingUser.save();

                return "Match added!";

            }
            return "User does not exist!";
        }
        return "Not a valid user ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addMoneyFieldOwner = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addMoneyInput.user_id)){
            existingUser = await User.findById(args.addMoneyInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.moneyZone.currentMoney += args.addMoneyInput.money;

                existingUser.markModified('user_type.moneyZone.currentMoney');

                await existingUser.save();

                return "Money added!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeMoneyFieldOwner = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.addMoneyInput.user_id)){
            existingUser = await User.findById(args.addMoneyInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(existingUser.user_type.moneyZone.currentMoney < args.addMoneyInput.money)
                    return "Insuficient founds !";

                existingUser.user_type.moneyZone.currentMoney -= args.addMoneyInput.money;

                existingUser.markModified('user_type.moneyZone.currentMoney');

                await existingUser.save();

                return "Money removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.clearCurrentMoney = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.user_id)){

            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.moneyZone.currentMoney = 0;

                existingUser.markModified('user_type.moneyZone.currentMoney');

                await existingUser.save();
                return "Current money reduced to 0!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID"
    }catch(err){
        console.log(err);
        return err;
    }

};

exports.addBillFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addBillFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.addBillFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.moneyZone.bills.push(args.addBillFieldOwnerInput.bill);

                existingUser.markModified("user_type.moneyZone.bills");

                existingUser.save();

                return "Bill added!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeBillFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.removeBillFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.removeBillFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                if(args.removeBillFieldOwnerInput.index > existingUser.user_type.moneyZone.bills.length || args.removeBillFieldOwnerInput.index < 0)
                    return "Not a valid index!";

                existingUser.user_type.moneyZone.bills = existingUser.user_type.moneyZone.bills
                .filter((bill, index) => index !== args.removeBillFieldOwnerInput.index);

                existingUser.markModified('user_type.moneyZone.bills');

                await existingUser.save();

                return "Bill removed!";
            }
            return "User does not exist!"; 
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeAllBillsFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.user_id)){
            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.moneyZone.bills = [];

                existingUser.markModified(`user_type.moneyZone.bills`);

                await existingUser.save();

                return "All bills removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addTransactionFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addTransactionFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.addTransactionFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.moneyZone.transactions.push(args.addTransactionFieldOwnerInput.transaction);

                existingUser.markModified('user_type.moneyZone.transactions');

                await existingUser.save();

                return "Transaction added!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeTransactionFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.removeTransactionFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.removeTransactionFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                if(args.removeTransactionFieldOwnerInput.index > existingUser.user_type.moneyZone.transactions.length || args.removeTransactionFieldOwnerInput.index < 0)
                    return "Not a valid index!";

                existingUser.user_type.moneyZone.transactions = existingUser.user_type.moneyZone.transactions
                .filter((transaction, index) => index !== args.removeTransactionFieldOwnerInput.index);

                existingUser.markModified('user_type.moneyZone.transactions');

                await existingUser.save();

                return "Transaction removed!";
            }
            return "User does not exist!"; 
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeAllTransactionsFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.user_id)){
            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.moneyZone.transactions = [];

                existingUser.markModified(`user_type.moneyZone.transactions`);

                await existingUser.save();

                return "All transactions removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addFieldForFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addFieldToOwnerInput.user_id)){
            existingUser = await User.findById(args.addFieldToOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(ObjectId.isValid(args.addFieldToOwnerInput.field_id)){
                    existingUser.user_type.fields.push(args.addFieldToOwnerInput.field_id);

                    existingUser.markModified('user_type.fields');

                    await existingUser.save();

                    return "Field added!";

                }
                return "Not a valid field ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;

    }
};

exports.removeFieldForFieldOwner = async(args) => {
    let existingUser;

    console.log(args);

    try{
        if(ObjectId.isValid(args.addFieldToOwnerInput.user_id)){
            existingUser = await User.findById(args.addFieldToOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(ObjectId.isValid(args.addFieldToOwnerInput.field_id)){
                    existingUser.user_type.fields = existingUser.user_type.fields
                    .filter((field) => field !== args.addFieldToOwnerInput.field_id);

                    existingUser.markModified('user_type.fields');

                    await existingUser.save();

                    return "Field removed!";

                }
                return "Not a valid field ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeAllFieldsOfFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.user_id)){
            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.fields = [];

                existingUser.markModified(`user_type.fields`);

                await existingUser.save();

                return "All fields removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addEmployeeToFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addEmployeeToFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.addEmployeeToFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(ObjectId.isValid(args.addEmployeeToFieldOwnerInput.employee_id)){
                    existingUser.user_type.employees.push(args.addEmployeeToFieldOwnerInput.employee_id);

                    existingUser.markModified(`user_type.employees`);

                    await existingUser.save();

                    return "Employee added!";
                }
                return "Not a valid Employee ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeEmployeeFromFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addEmployeeToFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.addEmployeeToFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(ObjectId.isValid(args.addEmployeeToFieldOwnerInput.employee_id)){
                    existingUser.user_type.employees = existingUser.user_type.employees
                    .filter(employee => employee !== args.addEmployeeToFieldOwnerInput.employee_id);

                    existingUser.markModified('user_type.employees');

                    await existingUser.save();

                    return "Employee removed!";
                }   
                return "Not a valid Employee ID!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}; 

exports.removeAllEmployeesFromFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.user_id)){
            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.employees = [];

                existingUser.markModified('user_type.employees');

                await existingUser.save();

                return "Employees removed!";
            }
            return "User does not exisat!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addStatisticToFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addStatisticToFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.addStatisticToFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.statistics.push(args.addStatisticToFieldOwnerInput.statistic);

                existingUser.markModified('user_type.statistics');

                await existingUser.save();

                return "Statistic added!";

            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeStatisticFromFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.removeStatisticFromFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.removeStatisticFromFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                if(existingUser.user_type.statistics.length <= args.removeStatisticFromFieldOwnerInput.index || args.removeStatisticFromFieldOwnerInput.index < 0)
                    return "Index is not valid!";
                    
                existingUser.user_type.statistics = existingUser.user_type.statistics
                .filter((statistic, index) => index !== args.removeStatisticFromFieldOwnerInput.index);

                existingUser.markModified('user_type.statistics');

                await existingUser.save();

                return "Statistic removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.editStatisticFromFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.editStatisticFromFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.editStatisticFromFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                if(existingUser.user_type.statistics.length <= args.editStatisticFromFieldOwnerInput.index || args.editStatisticFromFieldOwnerInput.index < 0)
                    return "Index is not valid!";
                existingUser.user_type.statistics[args.editStatisticFromFieldOwnerInput.index] = args.editStatisticFromFieldOwnerInput.statistic;
                //= existingUser.user_type.statistics
                // .map((statistic, index) => {
                //     if(index === args.editStatisticFromFieldOwnerInput.index)
                //         return args.editStatisticFromFieldOwnerInput.statistic;
                //     return statistic;
                // })

                existingUser.markModified('user_type.statistics');

                await existingUser.save();

                return "Statistic edited!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeAllStatisticsFromFieldOwner = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.user_id)){
            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.statistics = [];

                existingUser.markModified('user_type.statistics');

                await existingUser.save();

                return "Statistics removed!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.editBusinessDetailsFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.editBusinessDetailsFieldOwnerIntput.user_id)){
            existingUser = await User.findById(args.editBusinessDetailsFieldOwnerIntput.user_id);

            if(existingUser !== undefined && existingUser !== null){
                
                if(args.editBusinessDetailsFieldOwnerIntput.details.companyName !== "")
                    existingUser.user_type.businessDetails.companyName = args.editBusinessDetailsFieldOwnerIntput.details.companyName;
                
                if(args.editBusinessDetailsFieldOwnerIntput.details.registeredOfficeAddress !== "")
                    existingUser.user_type.businessDetails.registeredOfficeAddress = args.editBusinessDetailsFieldOwnerIntput.details.registeredOfficeAddress;

                if(args.editBusinessDetailsFieldOwnerIntput.details.bank !== "")
                    existingUser.user_type.businessDetails.bank = args.editBusinessDetailsFieldOwnerIntput.details.bank;
                
                if(args.editBusinessDetailsFieldOwnerIntput.details.iban !== "")
                    existingUser.user_type.businessDetails.iban = args.editBusinessDetailsFieldOwnerIntput.details.iban;
                
                if(args.editBusinessDetailsFieldOwnerIntput.details.companyFax !== "")
                    existingUser.user_type.businessDetails.companyFax = args.editBusinessDetailsFieldOwnerIntput.details.companyFax;
                
                if(args.editBusinessDetailsFieldOwnerIntput.details.companyWebSite !== "")
                    existingUser.user_type.businessDetails.companyWebSite = args.editBusinessDetailsFieldOwnerIntput.details.companyWebSite;
                
                if(args.editBusinessDetailsFieldOwnerIntput.details.companyPhone !== "")
                    existingUser.user_type.businessDetails.companyPhone = args.editBusinessDetailsFieldOwnerIntput.details.companyPhone;
                
                if(args.editBusinessDetailsFieldOwnerIntput.details.companyEmail !== "")
                    existingUser.user_type.businessDetails.companyEmail = args.editBusinessDetailsFieldOwnerIntput.details.companyEmail;
        
                existingUser.markModified(`user_type.businessDetails`);

                await existingUser.save();

                return "Business Details Updated!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addTicketFieldOwner = async(args) => {

    try{
        if(ObjectId.isValid(args.addTicketFieldOwnerInput.sender_id)){
            const existingUser = await User.findById(args.addTicketFieldOwnerInput.sender_id);

            if(existingUser !== null && existingUser !== undefined){
                if(ObjectId.isValid(args.addTicketFieldOwnerInput.receiver_id)){
                    const receiverUser = await User.findById(args.addTicketFieldOwnerInput.receiver_id);
                    
                    if(receiverUser !== null && receiverUser !== undefined){
                        const id = uuidv4();

                        const ticket = {
                            id: id,
                            name :  args.addTicketFieldOwnerInput.ticket.name,
                            message :  args.addTicketFieldOwnerInput.ticket.message,
                            user_id: args.addTicketFieldOwnerInput.ticket.user_id,
                            typeOfTicket :  args.addTicketFieldOwnerInput.ticket.typeOfTicket,
                            resolved :  false,
                        };

                        existingUser.user_type.tickets.ticketsSent.push(ticket);

                        existingUser.markModified('user_type.tickets.ticketsSent');

                        await existingUser.save();

                        receiverUser.user_type.tickets.ticketsReceived.push(ticket);

                        receiverUser.markModified('user_type.tickets.ticketsReceived');

                        await receiverUser.save();

                        return "Ticket sent!";
                    }
                    return "User Receiver does not exist!";
                }
                return "Not a valid Receiver ID!";
            }
            return "User Sender does not exist!";
        }
        return "Not a valid Sender ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.changeSolvedTicketFieldOwner = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.changeSolvedTicketFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.changeSolvedTicketFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                const id = existingUser.user_type.tickets.ticketsReceived
                .filter(ticket => {
                    if(ticket.id === args.changeSolvedTicketFieldOwnerInput.id)
                        return ticket.user_id;
                });

                const sender = await User.findById(id[0].user_id);

                existingUser.user_type.tickets.ticketsReceived = existingUser.user_type.tickets.ticketsReceived
                .map(ticket => {
                    if(ticket.id === args.changeSolvedTicketFieldOwnerInput.id)
                        ticket.resolved = true;
                    return ticket;
                });

                if(sender !== undefined && sender !== null){
                    
                    sender.user_type.tickets.ticketsSent = sender.user_type.tickets.ticketsSent
                    .map(ticket => {
                        if(ticket.id === args.changeSolvedTicketFieldOwnerInput.id)
                            ticket.resolved = true;
                        return ticket;
                    });

                    sender.markModified('user_type.tickets.ticketsSent');

                    await sender.save();

                    existingUser.markModified('user_type.tickets.ticketsReceived');

                    await existingUser.save();

                    return "Ticket changed!";
                }
                return "Sender does not exist anymore!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addContactPersonInFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.addContactPersonInFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.addContactPersonInFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.businessDetails.contactPeople.push(args.addContactPersonInFieldOwnerInput.contactPerson);

                existingUser.markModified('user_type.businessDetails.contactPeople');

                await existingUser.save();

                return "Contact person added!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeContactPersonFromFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.removeContactPersonFromFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.removeContactPersonFromFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){

                if(existingUser.user_type.businessDetails.contactPeople.length <= args.removeContactPersonFromFieldOwnerInput.index 
                    || args.removeContactPersonFromFieldOwnerInput.index < 0)
                    return "Not a valid index!";

                existingUser.user_type.businessDetails.contactPeople =  existingUser.user_type.businessDetails.contactPeople
                .filter((person, index) => index !== args.removeContactPersonFromFieldOwnerInput.index);

                existingUser.markModified('user_type.businessDetails.contactPeople');

                await existingUser.save();

                return "Contact person deleted!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.editContactPersonFromFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.editContactPersonFromFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.editContactPersonFromFieldOwnerInput.user_id);

            if(existingUser !== undefined && existingUser !== null){
                if(existingUser.user_type.businessDetails.contactPeople.length <= args.editContactPersonFromFieldOwnerInput.index 
                    || args.editContactPersonFromFieldOwnerInput.index < 0)
                    return "Not a valid index!";

                if(args.editContactPersonFromFieldOwnerInput.contactPerson.name !== "")
                    existingUser.user_type.businessDetails.contactPeople[args.editContactPersonFromFieldOwnerInput.index].name = args.editContactPersonFromFieldOwnerInput.contactPerson.name;
            
                if(args.editContactPersonFromFieldOwnerInput.contactPerson.phoneNumber !== "")
                    existingUser.user_type.businessDetails.contactPeople[args.editContactPersonFromFieldOwnerInput.index].phoneNumber = args.editContactPersonFromFieldOwnerInput.contactPerson.phoneNumber;

                if(args.editContactPersonFromFieldOwnerInput.contactPerson.email !== "")
                    existingUser.user_type.businessDetails.contactPeople[args.editContactPersonFromFieldOwnerInput.index].email = args.editContactPersonFromFieldOwnerInput.contactPerson.email;

                existingUser.markModified('user_type.businessDetails.contactPeople');
                
                await existingUser.save();

                return "Contact person updated!";

            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.deleteAllContactPeopleFromFieldOwner = async(args) => {
    let existingUser;
    try{
        if(ObjectId.isValid(args.user_id)){

            existingUser = await User.findById(args.user_id);

            if(existingUser !== null && existingUser !== undefined){
                existingUser.user_type.businessDetails.contactPeople = [];

                existingUser.markModified('user_type.businessDetails.contactPeople');

                await existingUser.save();

                return "Contact people cleansed!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addChatInFieldOwner = async(args) => {
    try{

                const name = uuidv4();

                const participants = [args.addChatFieldOwnerInput.participant1, args.addChatFieldOwnerInput.participant2];

                const chat = {
                    name: name,
                    participants: participants,
                    messages: [],
                };


                if(!ObjectId.isValid(participants[0].id))
                    return "Not a valid ID for Participant 1!";
                if(!ObjectId.isValid(participants[1].id))
                    return "Not a valid ID for Participant 2!";
                const participant1 = await User.findById(participants[0].id);
                const participant2 = await User.findById(participants[1].id);

                
                if(participant1 === undefined || participant1 === null)
                    return "First participant does not exist!";

                if(participant2 === undefined || participant2 === null)
                    return "Seacond participant does not exist!";

                participant1.user_type.chats.push(chat);
                participant2.user_type.chats.push(chat);

                participant1.markModified('user_type.chats');

                await participant1.save();

                participant2.markModified('user_type.chats');

                await participant2.save();

                return "Chat added!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.changeNameInChatFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.changeNameInChatFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.changeNameInChatFieldOwnerInput.user_id);

            if(existingUser !== undefined && existingUser !== null){
                existingUser.user_type.chats = existingUser.user_type.chats
                .map(chat => {
                    if(chat.name === args.changeNameInChatFieldOwnerInput.chat_id){
                        chat.participants = chat.participants
                        .map(participant => {
                            if(participant.id === args.changeNameInChatFieldOwnerInput.participant_id){
                                participant.name = args.changeNameInChatFieldOwnerInput.name;
                            }
                            return participant;
                        });
                    }
                    return chat;
                });
            
                existingUser.markModified('user_type.chats');

                await existingUser.save();

                return "Name changed!";
            }
            return "User does not exist!";
        }
        return "Not a valid ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.addMessageInFieldOwner = async(args) => {
    try{
        if(ObjectId.isValid(args.addMessageInFieldOwnerInput.user_id)){
            let participants; 
            
            const msg = {
                user_id: args.addMessageInFieldOwnerInput.user_id,
                message: args.addMessageInFieldOwnerInput.message,
                date: new Date(Date.now()).toISOString(),
            };

            let aux = await User.findById(args.addMessageInFieldOwnerInput.user_id);

            aux.user_type.chats.filter(chat => {
                if(chat.name === args.addMessageInFieldOwnerInput.chat_id)
                    participants = chat.participants;
            });

            if(!ObjectId.isValid(participants[0].id))
                return "Not a valid ID First User!";

            
            if(!ObjectId.isValid(participants[1].id))
                return "Not a valid ID Second User!";

            const user1 = await User.findById(participants[0].id);
            const user2 = await User.findById(participants[1].id);
        
            if(user1 === undefined || user1 === null)
                return "First User does not exist!";

            if(user2 === undefined || user2 === null)
                return "Second User does not exist!";

            user1.user_type.chats = user1.user_type.chats
            .map(chat => {
                if(chat.name === args.addMessageInFieldOwnerInput.chat_id)
                    chat.messages.push(msg);
                return chat;
            });

            user2.user_type.chats = user2.user_type.chats
            .map(chat => {
                if(chat.name === args.addMessageInFieldOwnerInput.chat_id)
                    chat.messages.push(msg);
                return chat;
            });

            user1.markModified('user_type.chats');
            
            await user1.save();

            user2.markModified('user_type.chats');

            await user2.save();

            return "Message Added!";
            
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.removeMessageInFieldOwner = async(args) => {    
    try{
        if(ObjectId.isValid(args.removeMessageInFieldOwnerInput.user_id)){
            let participants;
            let length;
            
            let aux = await User.findById(args.removeMessageInFieldOwnerInput.user_id);
        
            if(args.removeMessageInFieldOwnerInput.chat_id === "")
                return "Not a valid chat ID!";

            aux.user_type.chats.filter(chat => {
                if(chat.name === args.removeMessageInFieldOwnerInput.chat_id);{
                    participants = chat.participants;
                    length = chat.messages.length;
                }
            });

            if(length <= args.removeMessageInFieldOwnerInput.index || args.removeMessageInFieldOwnerInput.index < 0)
                return "Not a valid Index!";
            
            if(!ObjectId.isValid(participants[0].id))
                return "Not a valid ID First User!";

            
            if(!ObjectId.isValid(participants[1].id))
                return "Not a valid ID Second User!";

            const user1 = await User.findById(participants[0].id);
            const user2 = await User.findById(participants[1].id);

            user1.user_type.chats.map(chat => {
                if(chat.name === args.removeMessageInFieldOwnerInput.chat_id){
                    chat.messages = chat.messages.filter((message, index) => index !== args.removeMessageInFieldOwnerInput.index);
                };
            });

            user2.user_type.chats.map(chat => {
                if(chat.name === args.removeMessageInFieldOwnerInput.chat_id){
                    chat.messages = chat.messages.filter((message, index) => index !== args.removeMessageInFieldOwnerInput.index);
                };
            });
            
            user1.markModified('user_type.chats');
            
            await user1.save();

            user2.markModified('user_type.chats');

            await user2.save();

            return "Message Removed!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.clearAllMessagesInFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.clearAllMessagesInFieldOwnerInput.user_id)){
            existingUser = await User.findById(args.clearAllMessagesInFieldOwnerInput.user_id);

            if(existingUser !== null && existingUser !== undefined){
                if(args.clearAllMessagesInFieldOwnerInput.chat_id === "")
                    return "Not a valid Chat ID!";

                existingUser.user_type.chats.map(chat => {
                    if(chat.name === args.clearAllMessagesInFieldOwnerInput.chat_id){
                        chat.messages = [];
                    }
                    return chat;
                });

                existingUser.markModified('user_type.chats');

                await existingUser.save();

                return "Messages cleared!";
            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};

exports.changeYourNameInAllChatsFieldOwner = async(args) => {
    let existingUser;

    try{
        if(ObjectId.isValid(args.user_id)){
            existingUser = await User.findById(args.user_id);

            if(existingUser !== undefined && existingUser !== null){
                
                existingUser.user_type.chats = existingUser.user_type.chats.map(chat => {
                    
                    chat.participants = chat.participants.map(participant => {
                        if(participant.id === args.user_id)
                        participant.name = existingUser.user_details.username;
                        return participant;
                    })
                    
                    return chat;
                });

                existingUser.markModified('user_type.chats');
                
                await existingUser.save();
                
                existingUser.user_type.chats.map(chat => {
                    chat.participants = chat.participants.map(async(participant) => {
                        if(participant.id === args.user_id)
                            participant.name = existingUser.user_details.username;
                        else
                        {
                            let auxUser = await User.findById(participant.id);
                            auxUser.user_type.chats = auxUser.user_type.chats.map(chat => {
                               chat.participants = chat.participants.map(participant => {
                                   if(participant.id === args.user_id){
                                       participant.name = existingUser.user_details.username;
                                       return participant;
                                    }else
                                        return participant;
                               });

                            return chat;
                            });
                            auxUser.markModified('user_type.chats');

                            await auxUser.save();
                        }
                    })
                })

                return "Name changed!";

            }
            return "User does not exist!";
        }
        return "Not a valid User ID!";
    }catch(err){
        console.log(err);
        return err;
    }
};