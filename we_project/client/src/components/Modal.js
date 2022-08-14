import React from "react";
import axios from 'axios'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
import "./css/modal.css";
import { useState, useEffect } from 'react'
const API_KEY = '?&api_key=f536ce9a181c3ab1e48ec40c2747b4cd'
const BASE_URL = 'https://api.themoviedb.org/3'

function Modal(props) {
  const [addedMovie_FAV, setaddedMovie_FAV] = useState('Favorite')
  const [addedMovie_LATER, setaddedMovie_LATER] = useState('Watch Later')
  const user = useSelector(selectUser)
  // console.log(user.name)
  const VIDEO_URL = BASE_URL + '/movie/' + props.id + '/videos?' + API_KEY;
  const [yt_id, setID] = useState('')

  useEffect(() => {
    getVideo(VIDEO_URL)
  }, [])

  async function getVideo(url) {
    let response = await axios.get(url)
    response.data.results.map((val) => {
      if (val.type === "Trailer") {
        // console.log(val)
        setID(val.key)
      }
    })
  }


  function submitToDB_fav(name, id, rating, overview, username) {
    let desc = `Favorite movies for ${username}`
    axios.post('http://localhost:5000/moviesinsertinFAV', { name: name, id: id, rating: rating, overview: overview, username: username, description: desc })
      .then((response) => {
        console.log("Success from frontend")
      })

  }


  function submitToDB_dislike(name, id, rating, overview, username) {
    let desc = `Favorite movies for ${username}`
    axios.post('http://localhost:5000/moviesinsertinDISLIKE', { name: name, id: id, rating: rating, overview: overview, username: username, description: desc })
      .then((response) => {
        console.log("Success from frontend")
      })

  }

  function submitToDB_later(name, id, rating, overview, username) {
    let desc2 = `Watch  later for ${username}`

    axios.post('http://localhost:5000/moviesinsertinLATER', { name: name, id: id, rating: rating, overview: overview, username: username, description: desc2 })
      .then((response) => {
        console.log("Success from frontend")

      })
  }

  let YOUTUBE_URL = 'https://www.youtube.com/embed/' + yt_id
  // console.log(YOUTUBE_URL)
  return (
    <div className="modalBackground" data-aos="zoom-in">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              let left = document.querySelector('.left-arrow')
              let right = document.querySelector('.right-arrow')
              if (left) {
                left.style.visibility = "visible"

              }
              if (right) {
                right.style.visibility = "visible";

              }
              props.setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <para><b>{props.name}</b></para>
        </div>
        <div className="body">
          <div className="iframe-container">
            <iframe width="420" height="315" frameBorder="80" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
              src={YOUTUBE_URL}>
            </iframe>
          </div>
        </div>
        <div className="footer">
          {/* <button
            onClick={() => {
              let left = document.querySelector('.left-arrow')
              let right = document.querySelector('.right-arrow')
              if (left) {
                left.style.visibility = "visible"

              }
              if (right) {
                right.style.visibility = "visible";
              }
              props.setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Go back
          </button> */}

          <button onClick={() => {
            props.setOpenModal(false);
            submitToDB_fav(props.name, props.id, props.rating, props.overview, user.name)
            // setaddedMovie_FAV('Added to Favorites')

          }}
          > Favorite</button>
          <button onClick={() => {
            props.setOpenModal(false);
            submitToDB_later(props.name, props.id, props.rating, props.overview, user.name)
            // setaddedMovie_LATER('Added to Watch Later')

          }}
          > Watch Later</button>

          <button onClick={() => {
            props.setOpenModal(false);
            submitToDB_dislike(props.name, props.id, props.rating, props.overview, user.name)
            // setaddedMovie_LATER('Added to Dislikes')

          }}
          > Dislike</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;