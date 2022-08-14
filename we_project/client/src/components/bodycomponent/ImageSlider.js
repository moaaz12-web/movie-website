import React from "react";
import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import 'C:/Users/moaaz/Desktop/Javascript Projects/we_project/client/src/App.css'

const API_KEY = '?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


// http://api.themoviedb.org/3/movie/157336/videos??&api_key=f536ce9a181c3ab1e48ec40c2747b4cd


var img_urls = []
async function getMovieImg(url) {
  let response = await fetch(url);
  let res = response.json()
  res.then(data => {
    for (var i =0; i<data.results.length; i++){
      img_urls.push(IMG_URL + data.results[i].poster_path)
    }
  })
}
getMovieImg(API_URL)

function ImageSlider({ slides }) {
  const [current, setCurrentState] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrentState(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrentState(current === 0 ? length - 1 : current - 1)
  }

  // if (!Array.isArray(slides) || slides.length <= 0) {
  //   return null;
  // }

  return (
    <>
      <section className="slider"  >
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />

        {img_urls.map((slide, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (<img src={slide} alt="thisan" className="image" />
              )}
            </div>
          )
        })}
      </section>
    </>
  );


}

export default ImageSlider; 
