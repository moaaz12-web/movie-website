import React from 'react';
import Parentcomp from './components/Parentcomp';
import LoginPage from './components/LoginPage';
import MovieDetails from './components/MovieDetails'
import SearchResults from './components/SearchResults';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage'
import { useState } from 'react'
import Upcoming from './components/Upcoming';
import './App.css'
import Latest from './components/Latest'
import Landingpage from './components/Landingpage';
function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/Home" element={<Parentcomp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/MovieDetails" element={<MovieDetails />} />
          <Route path="/SearchResults" element={<SearchResults />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/Latest" element={<Latest />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;





