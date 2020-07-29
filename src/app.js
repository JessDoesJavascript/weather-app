const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'The Fucking Weather',
        name: 'Jessie Fucking Chapman'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
    title: 'What the FUCK is this website?',
    name: 'Jessie Chapman'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need some fucking help?',
        helpMessage: 'Type in your favourite shit place into the search bar and press search to generate the current fucking weather forecast.',
        name: 'Jessie fucking Chapman'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Specify a location. You shit. '
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
 
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'What the fuck',
        errorMessage: 'Literally no idea what the hell you are trying to do, pal',
        name: 'Jessie Chapman'
        
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'What the actual fuck',
        errorMessage: 'Page does not fucking exist.',
        name: 'Jessie Chapman'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})