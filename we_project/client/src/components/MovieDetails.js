import Modal from "./Modal";
import React from "react";
import "./css/Moviedetails.css";
import Para from "./bodycomponent/Para";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toparrow from "./toparrow.png";
import Navbar from "./bodycomponent/Navbar";
import axios from "axios";
const IMG_URL = "https://image.tmdb.org/t/p/w500"; //https://image.tmdb.org/t/p/w500/mk142GG0saiSXALY6V4wWcmPROW.jpg
const API_KEY = "?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd";
var genre_id;
var MOVIE_URL;

function MovieDetails() {
  useEffect(() => {
    fetchData(MOVIE_URL);
  }, []);
    const [modalOpen, setModalOpen] = useState(false);
    const [moviename, setMovieName] = useState('')
    const [movieId, setID] = useState('')
    const [rating, setRating] = useState(0)
    const [overview, setOverview] = useState('')
    const [src, setSrc] = useState('')
  const location = useLocation();
  const [data, setData] = useState([]);

  genre_id = location.state.id;

  MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&with_genres=${genre_id}`;

  const fetchData = async (url) => {
    let response = await axios.get(url);
    setData(response.data.results);
  };

  return (
    <>
      <Navbar />
      {/* <Para name=></Para> */}
      <p id="id-for-latest" data-aos="zoom-in">{location.state.name}</p>

      <img src={toparrow} className="arrow" alt="a top arrow"></img>
      <div className="content" 
>
        {data.map((val) => {
          return (
            <div className="movie" >
              <img
                src={IMG_URL + val.poster_path}
                alt="some"
                className="ggg"
                onClick={()=>{
                  setMovieName(val.title)
                  setID(val.id)
                  setRating(val.vote_average)
                  setOverview(val.overview)
                  setModalOpen(true)
                  setSrc(IMG_URL+val.poster_path)

                  // console.log(moviename)

              }}
              ></img>
              <p className="movie-descr">{val.title}</p>
              <div className="rate">Rating: {val.vote_average}</div>
              <div className="overview">{val.overview}</div>
            </div>
          );
        })}
                  {modalOpen && <Modal setOpenModal={setModalOpen} name = {moviename} id={movieId} rating={rating} overview={overview} src={src}/>}

      </div>
      <Footer></Footer>

    </>
  );
}

export default MovieDetails;