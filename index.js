const express = require('express');
const app = express();
const genreRouter = require('./routes/genre.routes');
const movieRouter = require('./routes/movie.routes');
const mongoose = require('mongoose');
const morgan = require('morgan');

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api', [genreRouter, movieRouter]);
// app.use('/a')

//MongoDB connection

mongoose.connect('mongodb://localhost/moviesAPI', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to database successfully'))
.catch((err) => console.log('Connection to DB unsuccessful'));

//Express port config
app.listen(4000, () => console.log('Server listening at 4000'));