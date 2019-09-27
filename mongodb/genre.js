const mongoose = require('mongoose');
const joi = require('@hapi/joi');

let genreSchema = mongoose.Schema({
    name: {type:String}
});

let genreModel = mongoose.model('genre', genreSchema);

function joiValidation(message){
    let Schema = joi.object().keys({
        name: joi.string().min(3).required()
    });

    return Schema.validate(message);
}

module.exports = {genreSchema,genreModel,joiValidation};