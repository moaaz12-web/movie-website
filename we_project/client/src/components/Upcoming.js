import Navbar from "./bodycomponent/Navbar";
import axios from "axios";
import Footer from "./Footer";
import Modal from "./Modal";
import React from "react";
import { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import '../App.css'
const API_KEY = '?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const UPCOMING_URL = BASE_URL + '/movie/upcoming?' + API_KEY + '&language=en-US&page=1'


function Upcoming() {
    const [movie, setMovie] = useState([])
    const [current, setCurrentState] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [moviename, setMovieName] = useState('')
    const [movieId, setID] = useState('')
    const [rating, setRating] = useState(0)
    const [overview, setOverview] = useState('')
    const [src, setSrc] = useState('')
    useEffect(() => {
        getMovieImg(UPCOMING_URL);
    });

    async function getMovieImg(url) {
        let response = await axios.get(url);
        setMovie(response.data.results)
    }


    var len = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const nextSlide = () => {
        // eslint-disable-next-line no-restricted-globals
        setCurrentState(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        // eslint-disable-next-line no-restricted-globals
        setCurrentState(current === 0 ? length - 1 : current - 1)
    }

    if (!Array.isArray(len) || len.length <= 0) {
        return null;
    }

    return (
        <>
            <Navbar />
            <p id="id-for-latest" data-aos="zoom-in">Upcoming Movies!</p>
            <section className="slider">
                <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
                <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />

                {movie.map((val, index) => {
                    return (
                        <>
                            <div className={index === current ? 'slide active' : 'slide'} key={index}>
                                {index === current && (
                                    <>
                                        <img
                                            src={IMG_URL + val.poster_path}
                                            alt="thisan"
                                            className="image"
                                            onClick={() => {
                                                setMovieName(val.title)
                                                setID(val.id)
                                                setRating(val.vote_average)
                                                setOverview(val.overview)
                                                setSrc(val.poster_path)
                                                setModalOpen(true)
                                                let left = document.querySelector('.left-arrow')
                                                let right = document.querySelector('.right-arrow')
                                                left.style.visibility = "hidden"
                                                right.style.visibility = "hidden";
                                                setModalOpen(true)
                                            }}
                                        />

                                    <p>{val.title}</p>
                                    <div className="rates">Rating: {val.vote_average}</div>
                                        {modalOpen && <Modal setOpenModal={setModalOpen} name={moviename} id={movieId} rating={rating} overview={overview} />}
                                    </>
                                )}
                            </div>
                        </>
                    )
                })}
            </section>
            <Footer></Footer>
        </>
    );
}

export default Upcoming