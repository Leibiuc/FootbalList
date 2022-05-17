const Training = require('../../models/training');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createTraining = (args) => {
    // console.log(args);
    const training = new Training({
        name: args.trainingInput.name,
        trainer:args.trainingInput.trainer,
        location: {
            longitude: args.trainingInput.location.longitude,
            latitude: args.trainingInput.location.latitude,
            country: args.trainingInput.location.country,
            county: args.trainingInput.location.county,
            city: args.trainingInput.location.city,
            address: args.trainingInput.location.address
        },
        field: args.trainingInput.field,
        duration:{
            date:args.trainingInput.duration.date,
            start:args.trainingInput.duration.start,
            end: args.trainingInput.duration.end,
            weekDays:args.trainingInput.duration.weekDays,
            totalDays:args.trainingInput.duration.totalDays
            },
        trainees: [],
        description:args.trainingInput.description,
        chat:{
            name: "Training chat",
            messages: []
        }

    });
    // console.log(training)
    return training
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            throw err;
        });

};

exports.addTrainee = async(args) => {
    // console.log(args)
    let existingTraining;
    try{
        if(ObjectId.isValid(args.addTraineeInput._id)){
        existingTraining = await Training.findOne({'_id' : args.addTraineeInput._id})
        
        if(existingTraining !== undefined && existingTraining !== null)
        {
            if(ObjectId.isValid(args.addTraineeInput.trainee.traineeID)){
            const existingPlayer = await Training.findOne({'trainees.traineeID' : args.addTraineeInput.trainee.traineeID})
            
            if(existingPlayer)
                return "Trainee already added!"
            if(existingTraining.trainees.length > 12)
                return "Too many trainees in the team!";
            existingTraining.trainees.push(args.addTraineeInput.trainee);

            await existingTraining.save();
            return "Trainee added successfuly!";
            }
            return "Not a valid trainee ID!";
        }
        return "Training not found!";
    }
    return "Not a valid training ID!";

    } catch(err){
        console.log(err)
        return err;
    }
};

exports.deleteTraining = async(args) => {
    let existingTraining;
    try{
        if(ObjectId.isValid(args.deleteTrainingInput._id)){
        existingTraining = await Training.findById(args.deleteTrainingInput._id);        
        if(existingTraining !== undefined && existingTraining !== null)
        {
            
            await existingTraining.remove();
            return "Training removed successfuly!";
        
        }
        return "Training not found!";
    }
    return "Training ID not valid!"
    } catch(err){
        console.log(err)
        return err;
    }
};

exports.removeTraineeFromTraining = async(args) => {
   console.log(args)
    let existingTraining;
    try{
        if(ObjectId.isValid(args.removeTraineeFromTraining.id_training)){
        existingTraining = await Training.findById(args.removeTraineeFromTraining.id_training);
        if(existingTraining !== undefined && existingTraining !== null){
            if(ObjectId.isValid(args.removeTraineeFromTraining.id_trainee)){
            let trainees = existingTraining.trainees
            trainees = trainees.filter(trainee => trainee.traineeID != args.removeTraineeFromTraining.id_trainee)
            existingTraining.trainees=trainees
           
            await existingTraining.save();

            return "Trainee removed from training!";
        }
        return "Trainee ID is not valid!";
    }
        return("The training does not exist");
        }
        return("The training ID is not valid");
    }catch(err)
    {
        console.log(err);
        return err;
    }
}

exports.leaveFeedbackForTrainer = async(args) => {
     console.log("args:",args)
    let existingTraining;
     let found = false
    try{
        if(ObjectId.isValid(args.trainingID)){
        existingTraining = await Training.findById(args.trainingID);
        
        if(existingTraining !== undefined && existingTraining !== null)
        {
            if(ObjectId.isValid(args.trainee_ID)){
          existingTraining.trainees.forEach(trainee => { 
                if(trainee.traineeID==args.trainee_ID){
                    found=true
                trainee.feedback=args.feedback }
              });
              if(!found)
              return "Couldn't find the trainee!";
        
            await existingTraining.save();
            return "Feedback added successfuly!";
        }
        return "Trainee ID is invalid!";
    }
        return "Training not found!";
    }
    return "Training ID invalid!";

        
    } catch(err){
        console.log(err)
        return err;
    }
};

exports.addRatingsForTrainee = async(args) => {
    //console.log("args:",args)
   let existingTraining;
    let found = false
   try{
    if(ObjectId.isValid(args.addRatingsForTraineeInput.id_training)){
       existingTraining = await Training.findById(args.addRatingsForTraineeInput.id_training);
       
       if(existingTraining !== undefined && existingTraining !== null)
       {
        if(ObjectId.isValid(args.addRatingsForTraineeInput.id_trainee)){
         existingTraining.trainees.forEach(trainee => { 
               if(trainee.traineeID==args.addRatingsForTraineeInput.id_trainee){
                   found=true
               trainee.ratings.physical=args.addRatingsForTraineeInput.ratings.physical 
               trainee.ratings.technique=args.addRatingsForTraineeInput.ratings.technique
               }
            });
             if(!found)
             return "Couldn't find the trainee!";
       
           await existingTraining.save();
           return "Ratings added successfuly!";
       }
       return "Trainee ID is invalid!";
    }
    return "Training not found!";
    }
    return "Training ID is invalid!";

   } catch(err){
       console.log(err)
       return err;
   }
};

exports.getTrainingByID = async(args) => {
    let existingTraining;
    try{
        if(ObjectId.isValid(args.id_training)){
            existingTraining = await Training.findById(args.id_training);
            return existingTraining;
            }
        return null;
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getTrainingsByTrainer = async(args) => {
    let existingTrainings;
    try{
        if(ObjectId.isValid(args.trainer_id)){
            existingTrainings = await Training.find({trainer : args.trainer_id});
            return existingTrainings;
        }
        return null;
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.sendTrainingMessage = async(args) =>{
    let existingTraining;
    try{
        if(ObjectId.isValid(args.messageInput._id)){
            existingTraining = await Training.findById(args.messageInput._id);
            if(existingTraining !== undefined && existingTraining !== null)
            {
                let message = {
                    user_id: args.messageInput.user_id,
                    message: args.messageInput.message,

                };
                console.log(typeof( existingTraining.chat.messages))
                existingTraining.chat.messages.push(message);
                await existingTraining.save();
                return "Message send successfuly!";
            }
            return "Training not found!";}
        return "Not a valid training ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.clearTrainingChat = async(args) => {
    let existingTraining;
    try{
        if(ObjectId.isValid(args.training_id)){
            existingTraining = await Training.findById(args.training_id);
            if(existingTraining !== undefined && existingTraining !== null)
            {
                existingTraining.chat.messages = [];
                await existingTraining.save();

                return "Chat deleted";
            }
            return "Training does not exist!";}
        return  "Not a valid ID!"
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.changeTrainingField = async(args) => {
    let existingTraining;
    try{
        if(ObjectId.isValid(args.training_id)){
            existingTraining = await Training.findById(args.training_id);
            if(existingTraining !== null && existingTraining !== undefined){
                if(ObjectId.isValid(args.field_id)){
                existingTraining.field = args.field_id
        
                await existingTraining.save();
                return "Training updated!";
                }
                return "Not a valid field ID!";    
            }
            return "Training not found!";
        }
    return "Not a valid training ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.changeTrainingDuration = async(args) => {
    let existingTraining;
    try{
        if(ObjectId.isValid(args.training_id)){
            existingTraining = await Training.findById(args.training_id);
            if(existingTraining !== null && existingTraining !== undefined){
                if(new Date(args.date_end) > new Date(args.date_start) && new Date(args.date_start) > new Date(Date.now())){
                    existingTraining.duration.start = args.date_start
                    existingTraining.duration.end = args.date_end
                    
                    await existingTraining.save();
                    return "Training updated!";
                }
                return "Invalid dates entered!"
            }
            return "Training not found!";
        }
    return "Not a valid training ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.changeTrainingLocation = async(args) => {
    let existingTraining;
    try{
        if(ObjectId.isValid(args.training_id)){
            existingTraining = await Training.findById(args.training_id);
            if(existingTraining !== null && existingTraining !== undefined){
                
               existingTraining.location.longitude = args.locationInput.longitude
               existingTraining.location.latitude = args.locationInput.latitude
               existingTraining.location.country = args.locationInput.country
               existingTraining.location.county = args.locationInput.county
               existingTraining.location.city = args.locationInput.city
               existingTraining.location.address = args.locationInput.address

                await existingTraining.save();
                return "Training updated!";   
            }
            return "Training not found!";
        }
    return "Not a valid training ID!";
    }catch(err){
        console.log(err);
        return err;
    }
}