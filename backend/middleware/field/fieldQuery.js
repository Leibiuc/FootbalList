const Field = require('../../models/field');


exports.fields = async() => {
    return Field
        .find()
        .then(fields => {
            return fields.map(field => {
                return{...field._doc, _id: field._doc._id.toString()};
            });
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

exports.getFieldByID = async(args) => {
    let existingField;

    try{
        existingField = await Field.findById(args.id_field);
        if(existingField !== undefined && existingField !== null)
        {
            return existingField;
        }
        return null;

    }catch(err){
        console.log(err);
        return err;
    }
}