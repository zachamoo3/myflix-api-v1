const mongoose = require('mongoose');



//Defining the Schemas
let genreSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
});

let directorSchema = mongoose.Schema({
    name: {type: String, required: true},
    birth_year: {type: String, required: true},
    death_year: {type: String, required: true},
    bio: {type: String, required: true}
});

let movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    release_date: Date,
    rating: String,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    directors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    image_url: {type: String, required: true},
    description: {type: String, required: true},
    featured: Boolean,
    actors: [String]
});

let userSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    birth_date: Date,
    favorite_movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});



//The Creation of the Models
//These will create collection such as db.movies within the MongoDB database.
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);



//Exporting the Models
//These will enable to ability to import the models in index.js
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Movie = Movie;
module.exports.User = User;