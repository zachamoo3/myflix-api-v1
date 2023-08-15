// setup requirements and constants
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const Genres = Models.Genre;
const Directors = Models.Director;
const Movies = Models.Movie;
const Users = Models.User;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // If a specific origin isn't found on the list of allowed origins
            let message = 'The CORS policy for this application does not allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

let auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport.js');

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




// CREATE - Allow new users to register
/* Expect req.body in this JSON format:
{
    username: String, (required)
    password: String, (required)
    email: String, (required)
    birth_date: Date
} */
app.post('/users', async (req, res) => {
    await Users.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return res.status(400)
                    .send(req.body.username + ' already exists');
            } else {
                Users
                    .create({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        birth_date: req.body.birth_date
                    })
                    .then((user) => {
                        res.status(201).json(user)
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
});

// CREATE - Allow users to add a movie to their list of favorites
app.post('/users/:username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username },
        {
            $push: { favorite_movies: req.params.MovieID }
        },
        { new: true }) // this makes sure that the updated document is returned
        .populate('favorite_movies', 'title')
        .then((updatedUser) => {
            res.status(201)
                .json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});




// READ - Return a list of All users
app.get('/users', async (req, res) => {
    await Users.find()
        .populate('favorite_movies', 'title')
        .then((users) => {
            res.status(200)
                .json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});

// READ - Return a user by a username
app.get('/users/:username', async (req, res) => {
    await Users.findOne({ username: req.params.username })
        .populate('favorite_movies', 'title')
        .then((user) => {
            res.status(200)
                .json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});

// READ - Return a list of ALL movies to the user
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .populate('genre', 'name')
        .populate('director', 'name')
        .then((movies) => {
            res.status(200)
                .json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});

// READ - Return data about a single movie by title to the user
app.get('/movies/:title', async (req, res) => {
    await Movies.findOne({ title: req.params.title })
        .populate('genre', 'name')
        .populate('director', 'name')
        .then((movie) => {
            res.status(200)
                .json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});

// READ - Return a list of All genres
app.get('/genres', async (req, res) => {
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
});

// READ - Return data about a genre by name
app.get('/genres/:name', async (req, res) => {
    await Genres.findOne({ name: req.params.name })
        .then((genre) => {
            res.status(200)
                .json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});

// READ - Return a list of All directors
app.get('/directors', async (req, res) => {
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
});

// READ - Return data about a director by name
app.get('/directors/:name', async (req, res) => {
    await Directors.findOne({ name: req.params.name })
        .then((director) => {
            res.status(200)
                .json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});




// UPDATE - Allow users to update their user info by username
/* We'll expect JSON in this format
{
    username: String, (required)
    password: String, (required)
    email: String, (required)
    birth_date: Date
} */
app.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Condition to check added here
    if (req.user.username !== req.params.username) {
        return res.status(400)
            .send('Permission denied');
    }
    // Condition ends
    await Users.findOneAndUpdate({ username: req.params.username },
        {
            $set:
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                birth_date: req.body.birth_date
            }
        },
        { new: true }) // this makes sure that the updated document is returned
        .populate('favorite_movies', 'title')
        .then((updatedUser) => {
            res.status(201)
                .json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});




// DELETE - Allow users to remove a movie from their list of favorites
app.delete('/users/:username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username },
        {
            $pull: { favorite_movies: req.params.MovieID }
        },
        { new: true }) // this makes sure that the updated document is returned
        .populate('favorite_movies', 'title')
        .then((updatedUser) => {
            res.status(200)
                .json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});

// DELETE - Allow existing users to deregister
app.delete('/users/:username', async (req, res) => {
    await Users.findOneAndRemove({ username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(400)
                    .send(req.params.username + ' was not found');
            } else {
                res.status(200)
                    .send(req.params.username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500)
                .send('Error: ' + err);
        });
});




// Listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

// setup Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack); // information about the error will be logged to the terminal, then logged in the console
    res.status(500).send('Something broke!')
});