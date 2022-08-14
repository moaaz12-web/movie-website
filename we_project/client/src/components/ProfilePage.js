import React from 'react'
import Navbar from './bodycomponent/Navbar'
import axios from "axios"
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Footer from './Footer'
import './css/ProfilePage.css'



function ProfilePage() {


  const [WatchLater, setWatchLater] = useState([])
  const [Favorites, setFavorites] = useState([])
  const [Dislike, setDislike] = useState([])
  const user = useSelector(selectUser)




  const username = user.name
  //  console.log(`I ran first in Profile page conole log ${user.name}`)  //! working correctly, giving username


  function getWatchLater(name) {
    axios.post('http://localhost:5000/watchlater', { user: name })
      .then((response) => {
        // console.log(response.data)
        setWatchLater(response.data)
      })
  }

  function getFavorites(name) {
    axios.post('http://localhost:5000/favorites', { user: name })
      .then((response) => {
        // console.log(response.data)
        setFavorites(response.data)
      })
  }

  function getDislikes(name) {
    axios.post('http://localhost:5000/dislike', { user: name })
      .then((response) => {
        // console.log(response.data)
        setDislike(response.data)
      })
  }



  useEffect(() => {
    getFavorites(user.name)
    getWatchLater(user.name)
    getDislikes(user.name)

  })


  // function removeItem(item, name) {
  //   axios.post('http://localhost:5000/remove', { id: item, user:name })
  //     .then((response) => {
  //       // console.log(response.data)
  //       // setFavorites(response.data)
  //       console.log("Success")
  //     })
    

  //   console.log(item)

  // }














  return (
    <>
      <Navbar />

      <div className='info' data-aos="zoom-in">
        <div >Welcome {user.name}</div>
        <div >Your email is {user.email}</div>
      </div>

      <div className='later' data-aos="zoom-out">
        <p className='pp' data-aos="fade-in">Your favorites</p>

        <div>
          {Favorites !== undefined && Favorites.map((val, idx) => {
            return (
              <div className='abc'>
                <li className="profile-movies">{val.name}</li>
                {/* <li>{val.movieID}</li> */}
                <button className='remove-btn' 
                // onClick={() => {
                //   removeItem(val.movieID)
                // }}
                >X</button>
              </div>)
          })}
        </div>

      </div>


      <div className='favorites' data-aos="zoom-out">
        <p className='pp' data-aos="fade-in">Watch later</p>
        <div>
          {WatchLater !== undefined && WatchLater.map((val, idx) => {
            return (
              <div className='abc'>
                <li className="profile-movies">{val.name}</li>
                <button className='remove-btn' 
                // onClick={() => {
                //   removeItem(val.movieID)
                // }}
                >X</button>
              </div>)
          })}


        </div>

      </div>


      <div className='dislikes' data-aos="zoom-out">
        <p className='pp' data-aos="fade-in">Disliked Videos</p>
        <div>
          {Dislike !== undefined && Dislike.map((val, idx) => {
            return (
              <div className='abc'>
                <li className="profile-movies">{val.name}</li>
                <button className='remove-btn' 
                // onClick={() => {
                //   removeItem(val.movieID)
                // }}
                >X</button>
              </div>
            )
          })}


        </div>

      </div>

      {/* <div className='parent'>
        <div className='later' data-aos="zoom-out">
          <p className='pp' data-aos="fade-in">Your favorites</p>

          <div>
            {Favorites !== undefined && Favorites.map((val, idx)=>{
              return (
              <li className="profile-movies">{val.name}</li>
              )
            })}
          </div>

        </div>
        <div className='favorites' data-aos="zoom-out">
          <p className='pp' data-aos="fade-in">Watch later</p>
          <div>
          {WatchLater !== undefined && WatchLater.map((val, idx)=>{
            return(
              <div className="profile-movies">{val.name}</div>
            )
            })}


          </div>

        </div>


        <div className='dislikes' data-aos="zoom-out">
          <p className='pp' data-aos="fade-in">Disliked Videos</p>
          <div>
          {Dislike !== undefined && Dislike.map((val, idx)=>{
            return(
              <div className="profile-movies">{val.name}</div>
            )
            })}


          </div>

        </div>
      </div> */}
      <Footer></Footer>
    </>
  )
}

export default ProfilePage