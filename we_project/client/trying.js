import React from 'react'
import './css/Moviedetails.css'
import { useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'
import Navbar from './bodycomponent/Navbar';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = '?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd'
var genre_id;
var genre;

var MOVIE_URL;

// `https://api.themoviedb.org/3/discover/movie??&api_key=f536ce9a181c3ab1e48ec40c2747b4cd&with_genres=27`


var img_urls = []
var titles = []
var ratings = []
var overviews = []






async function getMovieImg(url) {
    let response = await fetch(url);
    let res = response.json()


    res.then(data => {
        // showMovies(data.results)
        console.log(data.results)
        showMovies(data.results)
    })

    // res.then(data => {
    //    console.log(data.results.length)

    //    for (var i = 0; i < data.results.length; i++) {
    //      img_urls.push(data.results[i].poster_path);
    //      titles.push(data.results[i].title);
    //      ratings.push(data.results[i].vote_average);
    //      overviews.push(data.results[i].title);
    //    }
    //  })

    //  const cont = document.querySelector('.content')
    //  cont.innerHTML = `
    //      <p className='p'>TOP ${genre.toUpperCase()} MOVIES!</p>
    //      <p className='p'>Corresponding ID is ${genre_id} </p>
    //      <p className='p'>Titles are ${titles[0]} </p>
    //  `
    //  cont.style.backgroundColor = "red";
}


function showMovies(data){
    const cont = document.querySelector('.content')

    data.forEach(movie =>{
        let movieInfo = document.createElement('div')
        movieInfo.classList.add('movie');

        const {title, poster_path, vote_average, overview, id} = movie

        movieInfo.innerHTML = `

        <p className='p'>Titles are ${title} </p>


        <img src="${IMG_URL+poster_path}" alt="${title}"></img>

            <div class="moive-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>

            <div class="overview">
                ${overview}
            </div>
        `

        cont.appendChild(movieInfo)
    })

}


function MovieDetails() {
    
  const location = useLocation();
  genre = location.state.name;
  genre_id = location.state.id;

  MOVIE_URL=`https://api.themoviedb.org/3/discover/movie?${API_KEY}&with_genres=${genre_id}`
  getMovieImg(MOVIE_URL)

  



  return (
      <div>
      <Navbar />
      <p className='p'>TOP {genre.toUpperCase()} MOVIES!</p>
      <p className='p'>Corresponding ID is {genre_id} </p>

      <div className='content'>

      </div>

    </div>
    
    
  )
}


export default MovieDetails