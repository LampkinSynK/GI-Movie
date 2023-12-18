const request = require('request');

getMovie = (movie, callback) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=b1aa595c6b4b2532db2b113ed555bda1`

    request({ url, json: true},(error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to internet')
        } else if (body.error) {
            callback('Unable to find movie title', undefined)
        } else {
            callback(undefined , body.results)
        }
    })
}


module.exports = getMovie