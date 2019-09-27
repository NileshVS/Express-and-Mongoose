const mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
    name: {type:String}
});

let genreModel = mongoose.model('genre', genreSchema);

module.exports = {genreSchema,genreModel};