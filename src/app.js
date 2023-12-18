const path = require('path')
const express = require('express')
const hbs = require('hbs')
const findMovie = require('./utils/getMovie')
const getMovie = require('./utils/getMovie')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Settup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'JCDb'
    })
})

app.get('/movieData', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a movie title.'
        })
    }

    getMovie(req.query.search, (error, movieData) => {
        if (movieData.length < 1) {
            return res.send({ error: 'No movie found!' })
        }
        res.send({
            movieData
        })
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: "it's not your fault its ours :("
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})