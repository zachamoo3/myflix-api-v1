// setup requirements and constants
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const { check, validationResult } = require('express-validator');

const Genres = Models.Genre;
const Directors = Models.Director;
const Movies = Models.Movie;
const Users = Models.User;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
// let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://zachamoo3-myflix.netlify.app', 'https://myflix3-8b08c65e975f.herokuapp.com/', 'http://localhost:4200/'];
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             // If a specific origin isn't found on the list of allowed origins
//             let message = 'The CORS policy for this application does not allow access from origin ' + origin;
//             return callback(new Error(message), false);
//         }
//         return callback(null, true);
//     }
// }));
app.use(cors());

let auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport.js');

// Connect to local database
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Connect to database on MonoDB Atlas
mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// setup Logging
const accessLogStream = fs.createWriteStream( // create a write stream
    path.join(__dirname, 'log.text'), //a 'log.txt' file is created in the root directory
    { flags: 'a' } // path.join appends it to 'log.text'
);

app.use(
    morgan('combined', { stream: accessLogStream }) // enable morgan logging to 'log.txt'
);

// setup Static Files
app.use(
    express.static('public') // routes all requests for static files to the 'public' folder
);




/**
 * @method POST
 * @description Allow new users to register
 * @async
 * @param req.body:
 {
    Username: String(required),
    Password: String(required),
    Email: String(required),
    Birth_Date: Date,
 }
 * @throws Error 422 if the req.body is not formatted corrected or is empty
 * @throws Error 400 if there exists a user with the same req.body.Username
 * @throws Error 500 if unable to create a new entry in the User collection
*/
app.post('/users',
    [
        // Validation logic here for request
        check('Username', 'Username is required.')
            .isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.')
            .isAlphanumeric(),
        check('Password', 'Password is required.')
            .isLength({ min: 8 }),
        check('Email', 'Email is required.')
            .not().isEmpty(),
        check('Email', 'Email does not appear to be valid.')
            .isEmail()
    ],
    async (req, res) => {
        // check the validation object for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422)
                .json({ errors: errors.array() });
        }

        let hashedPassword = Users.hashPassword(req.body.Password);
        await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
            .then((user) => {
                if (user) { // If the user is found, send a response that it already exists
                    return res.status(400)
                        .send(req.body.Username + ' already exists');
                } else { // If it does not exist, create a user with the given username
                    Users
                        .create({
                            Username: req.body.Username,
                            Password: hashedPassword,
                            Email: req.body.Email,
                            Birth_Date: req.body.Birth_Date
                        })
                        .then((user) => {
                            res.status(201)
                                .json(user)
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500)
                                .send('Error: ' + error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500)
                    .send('Error: ' + error);
            });
    }
);

/** 
 * @method POST 
 * @description Allow users to add a movie to their list of favorites 
 * @async
 * @param req.params.Username: String(required)
 * @param req.params.MovieId: String(required)
 * @throws Error 500 if user is not authenticated
 * @throws Error 500 if any of the params are invalid entries
 * @throws Error 500 if unable to push to the user's Favorite_Movies
 * */
app.post('/users/:Username/movies/:MovieID',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Users.findOneAndUpdate({ Username: req.params.Username },
            {
                $push: { Favorite_Movies: req.params.MovieID }
            },
            { new: true }) // this makes sure that the updated document is returned
            // .populate('Favorite_Movies', 'Title')
            .then((updatedUser) => {
                res.status(201)
                    .json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);




/** 
 * @method GET
 * @description Return a list of All users 
 * @async
 * @returns list of all users
 * @example [ {User1}, {User2}, {User3} ]
 * @throws Error 500 if user is not authenticated
 * */
app.get('/users',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Users.find()
            // .populate('Favorite_Movies', 'Title')
            .then((users) => {
                res.status(200)
                    .json(users);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/** 
 * @method GET
 * @description Return a user by a username 
 * @async
 * @param req.params.Username: String(required)
 * @returns a single user
 * @example 
 {
    Username: String,
    Password: String,
    Email: String,
    Birth_Date: Date,
    Favorite_Movies: [ {FavMovie1}, {FavMovie2}, {FavMovie3} ]
 }
 * @throws Error 500 if user is not authenticated
 * @throws Error 500 if req.params.Username does not match a user
 * */
app.get('/users/:Username',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Users.findOne({ Username: req.params.Username })
            // .populate('Favorite_Movies', 'Title')
            .then((user) => {
                res.status(200)
                    .json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/** 
 * @method GET 
 * @description Return a list of ALL movies to the user 
 * @async
 * @returns list of all movies
 * @example [ {Movie1}, {Movie2}, {Movie3} ]
 * @throws Error 500 if user is not authenticated
 * */
app.get('/movies',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Movies.find()
            .populate('Genre', 'Name')
            .populate('Director', 'Name')
            .then((movies) => {
                res.status(200)
                    .json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/** 
 * @method GET
 * @description Returns data about a single movie to the the user
 * @async
 * @param req.params.Title: String(required)
 * @returns a single movie
 * @example
 {
    Title: String,
    Release_Date: Date,
    Rating: String,
    Genre: {Genre},
    Director: {Director},
    Image_Url: String,
    Description: String,
    Featured: Boolean
 }
 * @throws Error 500 if user is not authenticated
 * @throws Error 500 if req.params.Title does not match a movie
 */
app.get('/movies/:Title',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Movies.findOne({ Title: req.params.Title })
            .populate('Genre', 'Name')
            .populate('Director', 'Name')
            .then((movie) => {
                res.status(200)
                    .json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/**
 * @method GET
 * @description Return a list of All genres
 * @async
 * @returns list of all genres
 * @example [ {Genre1}, {Genre2}, {Genre3} ]
 * @throws Error 500 if user is not authenticated
 */
app.get('/genres',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Genres.find()
            .then((genres) => {
                res.status(200)
                    .json(genres);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/**
 * @method GET
 * @description Return data about a genre by name
 * @async
 * @param req.params.Name: String(required)
 * @returns a single genre
 * @example
 {
    Name: String,
    Description: String
 }
 * @throws Error 500 if user is not authenticated
 * @throws Error 500 if req.params.Name does not match a genre
 */
app.get('/genres/:Name',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Genres.findOne({ Name: req.params.Name })
            .then((genre) => {
                res.status(200)
                    .json(genre);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/** 
 * @method GET
 * @description Return a list of All directors
 * @async
 * @returns list of all directors
 * @example [ {Director1}, {Director2}, {Director3} ]
 * @throws Error 500 if user is not authenticated
 */
app.get('/directors',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Directors.find()
            .then((directors) => {
                res.status(200)
                    .json(directors);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/** 
 * @method GET
 * @description Return data about a director by name
 * @async
 * @param req.params.Name: String(required)
 * @returns a single director
 * @example
 {
    Name: String,
    Birth_Year: String,
    Death_Year: String,
    Bio: String
 }
 * @throws Error 500 if user is not authenticated
 * @throws Error 500 if req.params.Name does not match a director
 */
app.get('/directors/:Name',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Directors.findOne({ Name: req.params.Name })
            .then((director) => {
                res.status(200)
                    .json(director);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);




/**
 * @method PUT
 * @description Allow users to update their user info by username
 * @async
 * @param req.params.Username: String(required)
 * @param req.body:
 {
    Username: String,
    Password: String,
    Email: String,
    Birth_Date: Date
 }
 * @throws Error 500 if user is not authenticated
 * @throws Error 422 if req.body is not formatted correctly or is empty
 * @throws Error 400 if user is attempting to update a profile that is not their own
 * @throws Error 500 if cannot find the user's profile based on given data
 */
app.put('/users/:Username',
    passport.authenticate('jwt', { session: false }),
    [
        // Validation logic here for request
        check('Username', 'Username is required.')
            .isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.')
            .isAlphanumeric(),
        check('Password', 'Password is required.')
            .isLength({ min: 8 }),
        check('Email', 'Email is required.')
            .not().isEmpty(),
        check('Email', 'Email does not appear to be valid.')
            .isEmail()
    ],
    async (req, res) => {
        // check the validation object for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422)
                .json({ errors: errors.array() });
        }

        // Condition to check added here
        if (req.user.Username !== req.params.Username) {
            return res.status(400)
                .send('Permission denied');
        }
        // Condition ends
        let hashedPassword = Users.hashPassword(req.body.Password);
        await Users.findOneAndUpdate({ Username: req.params.Username },
            {
                $set:
                {
                    Username: req.body.Username,
                    Password: hashedPassword,
                    Email: req.body.Email,
                    Birth_Date: req.body.Birth_Date
                }
            },
            { new: true }) // this makes sure that the updated document is returned
            // .populate('Favorite_Movies', 'Title')
            .then((updatedUser) => {
                res.status(201)
                    .json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);




/**
 * @method DELETE
 * @description Allow users to remove a movie from their list of favorites
 * @async
 * @param req.params.Username: String(required)
 * @param req.params.MovieId: String(required)
 * @throws Error 500 if user is not authenticated
 * @throws Error 500 if any of the params are invalid entries
 * @throws Error 500 if unable to pull from the user's Favorite_Movies
 * @throws Error 400 if user is attempting to update a different user's Favorite_Movies
 */
app.delete('/users/:Username/movies/:MovieID',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        // Condition to check added here
        if (req.user.Username !== req.params.Username) {
            return res.status(400)
                .send('Permission denied');
        }
        // Condition ends
        await Users.findOneAndUpdate({ Username: req.params.Username },
            {
                $pull: { Favorite_Movies: req.params.MovieID }
            },
            { new: true }) // this makes sure that the updated document is returned
            // .populate('Favorite_Movies', 'Title')
            .then((updatedUser) => {
                res.status(200)
                    .json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);

/** 
 * @method DELETE
 * @description Allow existing users to deregister
 * @async
 * @param req.params.Username: String(required)
 * @throws Error 500 if the user is not authenticated
 * @throws Error 400 if user is attempting to delete a profile that is not theirs
 * @throws Error 400 if the user's entry was not found in the collection
 * @throws Error 500 if unable to delete the user's entry
 */
app.delete('/users/:Username',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        // Condition to check added here
        if (req.user.Username !== req.params.Username) {
            return res.status(400)
                .send('Permission denied');
        }
        // Condition ends
        await Users.findOneAndRemove({ Username: req.params.Username })
            .then((user) => {
                if (!user) {
                    res.status(400)
                        .json(req.params.Username + ' was not found');
                } else {
                    res.status(200)
                        .json(req.params.Username + ' was deleted.');
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send('Error: ' + err);
            });
    }
);




// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
})

// setup Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack); // information about the error will be logged to the terminal, then logged in the console
    res.status(500).send('Something broke!')
});