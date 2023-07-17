// setup requirements and constants
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');
const app = express();

let topMovies = [
    {
        title: `Star Wars: The Empire Strikes Back`,
        director: 'Irvin Kershner',
        year: '1980'
    },
    {
        title: `Indiana Jones: The Raiders of the Lost Ark`,
        director: 'Steven Spielberg',
        year: '1981'
    },
    {
        title: `The Princess Bride`,
        director: 'Rob Reiner',
        year: '1987'
    },
    {
        title: `The Count of Monte Cristo`,
        director: 'Kevin Reynolds',
        year: '2002'
    },
    {
        title: `The Dark Knight`,
        director: 'Christopher Nolan',
        year: '2008'
    },
    {
        title: `Iron Man`,
        director: 'Jon Favreau',
        year: '2008'
    },
    {
        title: `The Court Jester`,
        director: 'Melvin Frank, Norman Panama',
        year: '1956'
    },
    {
        title: `For a Few Dollars More`,
        director: 'Sergio Leone',
        year: '1965'
    },
    {
        title: `The Santa Clause`,
        director: 'John Pasquin',
        year: '1994'
    },
    {
        title: `Dungeons & Dragons: Honor Among Thieves`,
        director: 'John Francis Daley, Jonathan Goldstein',
        year: '2023'
    }
]



// setup Logging
const accessLogStream = fs.createWriteStream( // create a write stream
    path.join(__dirname, 'log.text'), //a 'log.txt' file is created in the root directory
    { flags: 'a' } // path.join appends it to 'log.text'
);

app.use(morgan('combined', { stream: accessLogStream })); // enable morgan logging to 'log.txt'



// setup User Authentication



// setup JSON Parsing



// setup App Routing
app.use(
    express.static('public') // routes all requests for static files to the 'public' folder
);



// GET requests
app.get('/movies', (req, res) => {
    res.json(topMovies)
});

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
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