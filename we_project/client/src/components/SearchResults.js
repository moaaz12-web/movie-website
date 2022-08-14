import Modal from './Modal';
import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Footer from './Footer';
import { useState, useEffect } from 'react'
import "./css/Moviedetails.css";
import Navbar from './bodycomponent/Navbar';
import Para from './bodycomponent/Para';
const API_KEY = '?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd'
const BASE_URL = 'https://api.themoviedb.org/3'
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


function SearchResults() {

    const tempStyle = {
        "display": "flex",
        "justify-content": "space-between"
    }
    const tempStyle2 = {
        "display": "flex",
        "justify-content": "space-around"
    }
    const data = useLocation();
    const movieName = data.state.name
    const search = SEARCH_URL + '&query=' + movieName
    const [movies, setMovies] = useState([]);
    const [reviews, setReviews] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [modalOpen, setModalOpen] = useState(false);

    const [moviename, setMovieName] = useState('')
    const [movieId, setID] = useState('')
    const [rating, setRating] = useState(0)
    const [overview, setOverview] = useState('')
    const [src, setSrc] = useState('')
    let navigate = useNavigate()

    var recomm_url;
    var review_url;

    useEffect(() => {
        fetch(search);
    }, [movieName]);


    const fetch = async (search) => {
        let response = await axios.get(search)
        // console.log(" Fetch ran secnond")
        //! console.log(response.data.results[0].title)
        setMovies(response.data.results)
        var id = response.data.results[0].id
        // console.log(response.data.results[0].id)
        recomm_url = BASE_URL + '/movie/' + id + '/recommendations?' + API_KEY + '&language=en-US&page=1';
        review_url = BASE_URL + '/movie/' + id + '/reviews?' + API_KEY + '&language=en-US&page=1';
        let res = await axios.get(recomm_url)
        setRecommendations(res.data.results)
        let res2 = await axios.get(review_url)
        setReviews(res2.data.results)
    }
    return (
        <div id="parent">
            <Navbar />
            <p id="id-for-latest" data-aos="zoom-in">{"Search results for " + movieName}</p>

            {/* <Para  /> */}
            <div className="content">
                {movies.map((val) => {
                    return (
                        <div className="movie">
                            <img
                                src={IMG_URL + val.poster_path}
                                alt="some"
                                className="ggg"
                                onClick={() => {
                                    setMovieName(val.title)
                                    setID(val.id)
                                    setRating(val.vote_average)
                                    setOverview(val.overview)
                                    setSrc(val.poster_path)
                                    setModalOpen(true)
                                }}
                            ></img>
                            <p className="movie-descr">{val.title}</p>
                            <div className="rate">Rating: {val.vote_average}</div>
                            <div className="overview">{val.overview}</div>
                        </div>
                    );
                })}
                {modalOpen && <Modal setOpenModal={setModalOpen} name={moviename} id={movieId} rating={rating} overview={overview} />}
            </div>

            {/* <div>
                <p id="pp">Reviews for {movieName}</p>
                <div>
                    <hr></hr>
                {reviews.map((val) => {
                    return (
                        <div>
                            <li>{val.content}</li>
                            <hr></hr>
                        </div>
                    );
                })}

                </div>
            </div> */}

            <Para name={"You might also like! "} />

            <div className="content">
                {recommendations.map((val) => {
                    return (
                        <div className="movie">
                            <img
                                src={IMG_URL + val.poster_path}
                                alt="some"
                                className="ggg"
                                onClick={() => {
                                    setMovieName(val.title)
                                    setID(val.id)
                                    // console.log(moviename)
                                    setModalOpen(true)
                                }}
                            ></img>
                            <p className="movie-descr">{val.title}</p>
                            {/* <button onClick={()=>{console.log("first")}} className="movie-descr">{val.title}</button> */}
                            <div className="rate">Rating: {val.vote_average}</div>
                            <div className="overview">{val.overview}</div>
                        </div>
                    );
                })}
                {modalOpen && <Modal setOpenModal={setModalOpen} name={moviename} id={movieId} />}
            </div>
            <Footer></Footer>
        </div>

    )
}
export default SearchResults