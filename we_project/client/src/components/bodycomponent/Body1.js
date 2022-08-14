import React from 'react'
import 'C:/Users/moaaz/Desktop/Javascript Projects/we_project/client/src/components/css/lists.css'

import { useNavigate} from 'react-router-dom'
// import { useState } from 'react'
// import { BtnContext } from '../../context/BtnContext'

// const BASE_URL = 'https://api.themoviedb.org/3'
// const movie_id = '444'
// const CAST_URL = `${BASE_URL}/movie/${movie_id}/credits${API_KEY}`
// const GENRE_URL_ID = 'https://api.themoviedb.org/3/genre/movie/list?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd&language=en-US'
const API_KEY = '?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd'
var genre_id = 35
const GENRE_URL = `https://api.themoviedb.org/3/discover/movie${API_KEY}&with_genres=${genre_id}`

var img_urls = []
var titles = []
var ratings = []
var overviews = []

async function getMovieImg(url) {
    let response = await fetch(url);
    let res = response.json()
    res.then(data => {

        for (var i = 0; i < data.results.length; i++) {
            img_urls.push(data.results[i].poster_path);
            titles.push(data.results[i].title);
            ratings.push(data.results[i].vote_average);
            overviews.push(data.results[i].title);
        }
    })
}
getMovieImg(GENRE_URL)



function Body1() {

    let navigate = useNavigate();
    return (
        <div className='list-div'>


            <div className='list-div1' >
                <button className="list-btn"   onClick={() => { navigate(`/MovieDetails`, { state: { id: 28, name: 'Action' } }) }}>
                    Action
                </button>
                <br></br>
                <button className="list-btn"  onClick={() => { navigate(`/MovieDetails`, { state: { id: 12, name: 'Adventure' } }) }}>
                    Adventure
                </button>
                <br></br>

                <button className="list-btn"  onClick={() => { navigate(`/MovieDetails`, { state: { id: 9648, name: 'Mystery' } }) }}>
                    Mystery
                </button>
                <br></br>
            </div>

            <div className='list-div1'>
                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 878, name: 'Sci-Fi' } }) }}>
                    Sci-Fi
                </button>
                <br></br>

                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 10752, name: 'War' } }) }}>
                    War
                </button>
                <br></br>

                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 53, name: 'Thriller' } }) }}>
                    Thriller
                </button>
                <br></br>
            </div>

            <div className='list-div1'>
                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 10751, name: 'Family' } }) }}>
                    Family
                </button>
                <br></br>
                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 35, name: 'Comedy' } }) }}>
                    Comedy
                </button>
                <br></br>
                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 80, name: 'Crime' } }) }}>
                    Crime
                </button>
                <br></br>

            </div>

            <div className='list-div1'>
                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 18, name: 'Drama' } }) }}>
                    Drama
                </button>
                <br></br>
                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 27, name: 'Horror' } }) }}>
                    Horror
                </button>
                <br></br>
                <button className="list-btn" onClick={() => { navigate(`/MovieDetails`, { state: { id: 99, name: 'Documentary' } }) }}>
                    Documentary
                </button>
                <br></br>
            </div>
        </div>
    )
}

export default Body1