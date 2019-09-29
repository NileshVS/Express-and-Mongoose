const mongoose = require('mongoose');
const gSchema= require('./genre');

let movieSchema = mongoose.Schema({
    name: {type:String, min:3, max: 300, required:true},
    genre: {type: gSchema.genreSchema ,required:true},
    rating: {type:Number, required: true},
    price: {type:Number, required:true}
});

let movieModel = mongoose.model('movies', movieSchema);

module.exports = {movieSchema, movieModel};