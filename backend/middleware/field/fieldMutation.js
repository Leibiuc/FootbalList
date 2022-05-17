const Field = require('../../models/field');


exports.createField = (args) => {
    const field = new Field({
        location:{
            longitude: args.fieldInput.location.longitude,
            latitude: args.fieldInput.location.latitude,
            country: args.fieldInput.location.country,
            county: args.fieldInput.location.county,
            city: args.fieldInput.location.city,
            address: args.fieldInput.location.address,
        } ,
        fieldAdministrator: args.fieldInput.fieldAdministrator,
        fieldPage:{
            name: args.fieldInput.fieldPage.name,
            profileImage: args.fieldInput.fieldPage.profileImage,
            gallery:[],
            review:[],
            price: {
               generalPrice: args.fieldInput.fieldPage.price,
            },
            customPrices: [],
            facilities: args.fieldInput.fieldPage.facilities,
            description: args.fieldInput.fieldPage.description,
            posts:[]
        },
        matchDetails: args.fieldInput.matchDetails ,
        disponibility: args.fieldInput.disponibility,
        services:args.fieldInput.services
        
    });
    return field
        .save()
        .then(res => {
            return {...res._doc, _id: res._doc._id.toString()};
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

