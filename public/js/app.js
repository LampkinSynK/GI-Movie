const movieForm = document.getElementById('movieForm')
const search = document.getElementById('movieSearch')
const movieDisplay = document.getElementById('movie-display')
const movieText = document.getElementById('movie-text')
const topSearch = document.getElementById('top-search')
const background = document.getElementById('background')
var arr = [];

movieForm.addEventListener('keyup', (e) => {

    const movie = search.value;
    movieDisplay.textContent = '';
    topSearch.textContent = '';
    background.style.backgroundImage = '';
    movieText.textContent = 'Loading...'

    fetch(`http://localhost:3000/movieData?search=${movie}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            movieText.textContent = data.error;
        } else {
            movieText.textContent = `Search "${movie}"`
            data.movieData.forEach((element, index) =>{
                if (index === 0) {
                    const movieSearched = {
                        title: element.title,
                        language: element.original_language,
                        rate: element.vote_average,
                        img: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + element.poster_path,
                        backdrop: 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/'+ element.backdrop_path,
                        id: element.id,
                        overview: element.overview,
                    }
                    var newMovie = document.createElement("div")
                    newMovie.innerHTML = `
                    <a id='top-img' href=${'https://www.themoviedb.org/movie/' + movieSearched.id}><img src=${movieSearched.img} height="330" width="220"></a>
                    <div id="top-desc"><p>${movieSearched.title} (${movieSearched.rate.toFixed(2)}/10)</p>
                    <p>${movieSearched.overview}</p></div>
                    `
                    topSearch.appendChild(newMovie);
                    console.log(movieSearched.backdrop)
                    if (isNaN(movieSearched.backdrop)) {
                        background.style.backgroundImage = `url('${movieSearched.img}')`
                    } else{
                        background.style.backgroundImage = `url('${movieSearched.backdrop}')`
                    }
                    
                } else {
                    const movieSearched = {
                        title: element.title,
                        language: element.original_language,
                        rate: element.popularity,
                        img: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + element.poster_path,
                        id: element.id,
                    }
                    var newMovie = document.createElement("div")
                    newMovie.innerHTML = `
                    <a href=${'https://www.themoviedb.org/movie/' + movieSearched.id}><img src=${movieSearched.img} height="330" width="220"></a>
                    <p>${movieSearched.title}</p>
                    `
                    movieDisplay.appendChild(newMovie);
                }
                
            })
        }
    })
})
})

