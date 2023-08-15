const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



//Defining the Schemas
let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true}
});

let directorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Birth_Year: {type: String, required: true},
    Death_Year: {type: String, required: true},
    Bio: {type: String, required: true}
});

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Release_Date: Date,
    Rating: String,
    Genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    Director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    Image_Url: {type: String, required: true},
    Description: {type: String, required: true},
    Featured: Boolean,
    Actors: [String]
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birth_Date: Date,
    Favorite_Movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});



// Hash & Validate user passwords
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};



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