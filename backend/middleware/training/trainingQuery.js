const Training = require('../../models/training');

exports.trainings = () =>  {
    console.log("works");
    return Training
        .find()
        .then(trainings => {
            return trainings.map(training => {
                console.log(training);
                return{...training._doc, _id: training._doc._id.toString()};
            });
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

exports.getTrainingByID = async(args) => {
    let existingTraining = null;
    console.log("works");
    try{
        existingTraining = await Training.findById(args._id);
        if(existingTraining !== undefined && existingTraining !== null){
            console.log(existingTraining.duration.end)
            
            return existingTraining;
        }
    }catch(err){
        console.log(err);
        return(err);
    }
};