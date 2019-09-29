const express = require('express');
const genre = require('../mongodb/genre');
const movie = require('../mongodb/movie');
const router = express.Router();
const Joi = require('@hapi/joi');

router.post('/newmovie', async (req,res) => {
    
    let {error} = Validation(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }
    else{
        let genreId = await genre.genreModel.findById(req.body.genre);
        let data = new movie.movieModel({
            name: req.body.name,
            genre: {
                _id: genreId._id,
                name: genreId.name
            },
            rating: req.body.rating,
            price: req.body.price
        });
        let savedData = await data.save();
        res.send(savedData);
    }

});


async function Validation(para) {
    let Schema = Joi.object().keys({
        name: Joi.string().min(3).max(250).required(),
        genre: Joi.string().required(),
        rating: Joi.number().required(),
        price: Joi.number().required()
    });

    return Schema.validate(para);
}

module.exports = router;