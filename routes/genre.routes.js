const express = require('express');
const router = express.Router();
const genreModule = require('../mongodb/genre');

router.get('/test', (req,res) => {
    res.send('Working');
});

//APIs
router.post('/newgenre', async (req,res) => {

    let {error} = genreModule.joiValidation(req.body);
    if (error){
        res.status(404).send(error.details[0].message)
    }
    else{
        let newGenre = new genreModule.genreModel({
            name: req.body.name
        });
        let save= await newGenre.save();
        res.send(save);
    }
});

router.put('/updategenre/:id', async(req,res) => {
    let {error} = genreModule.joiValidation(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
    }
    
    else{
        let update=await genreModule.genreModel.findByIdAndUpdate(req.params.id, req.body,() => console.log('ID value updated'));
        let updated= await genreModule.genreModel.findById(req.params.id);
        res.send(updated);
        if(!update){
            res.send('Please provide a valid ID');
        }
    }
});

router.delete('/deletegenre/:id', async (req,res) => {
    let {error} = genreModule.joiValidation(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
    }
    else{
        genreModule.genreModel.findByIdAndRemove(req.params.id, () => console.log('Entry removed'));
        res.send("Deleted");
    }
});
module.exports = router;