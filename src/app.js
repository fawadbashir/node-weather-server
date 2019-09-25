const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views', viewsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Fawad Bashir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Fawad Bashir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Fawad Bashir'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address

    if (address) {

        geocode(address, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            forecast(data.longitude, data.latitude, (error, forecastData) => {
                if (error) {
                    return res.send(error)
                }
                res.send({
                    location: data.location,
                    forecast: forecastData,
                    address
                })
                // console.log(data.location)
                // console.log(forecastData)
            })
        })
    } else {
        return console.log('please provide a location')
    }


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        name: 'Fawad Bashir'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fawad Bashir',
        error: 'Page Not Found'
    })
})
app.listen(4000, () => {
    console.log('Server Up')
})