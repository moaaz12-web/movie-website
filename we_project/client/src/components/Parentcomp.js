import Navbar from "./bodycomponent/Navbar";
import ImageSlider from "./bodycomponent/ImageSlider";
import Para from "./bodycomponent/Para";
import Body1 from "./bodycomponent/Body1";
import Footer from "./Footer";
import React from 'react';
import '../App.css'
var len = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

function parentcomp() {
  return (
    <div>
      <Navbar />
      <Para name="Most popular" ></Para>
      <ImageSlider slides={len} />
      <Para name="Search by filters"></Para>
      <Body1 />
      <Footer/>
    </div>
  )
}

export default parentcomp