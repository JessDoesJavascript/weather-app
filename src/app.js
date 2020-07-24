const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

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
        title: 'The flipping weather',
        name: 'Jessie Chapman'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About this website',
    name: 'Jessie Chapman'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'Search for a location to find its current weather. Built with Node.js.',
        name: 'Jessie Chapman'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
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

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page does not exist',
        errorMessage: 'Sorry, help article not found',
        name: 'Jessie Chapman'
        
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page does not exist',
        errorMessage: 'Sorry, page not found',
        name: 'Jessie Chapman'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})