import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import 'remixicon/fonts/remixicon.css'
import Trending from './components/Trending.jsx'
import Popular from './components/Popular.jsx'
import Movie from './components/Movie.jsx'
import Tvshows from './components/Tvshows.jsx'
import People from './components/People.jsx'
import TvDetails from './components/TvDetails.jsx'
import PersonDetails from "./components/PersonDetaills.jsx"
import MovieDetails from './components/MovieDetails.jsx'
import Trailer from './components/templates/Trailer.jsx'
import Notfound from './components/Notfound.jsx'

function App() {
  return (
    <div className= 'bg-[#1F1E24] w-screen h-screen flex'>
  
      <Routes>  
          <Route path='/' element={<Home />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/movie' element={<Movie />} /> 
          <Route path='/movie/details/:id' element={<MovieDetails />}>
                <Route path='/movie/details/:id/trailer' element={<Trailer />} />
          </Route>
          <Route path='/tv' element={<Tvshows />} /> 
          <Route path='/tv/details/:id' element={<TvDetails />}>
                    <Route path='/tv/details/:id/trailer' element={<Trailer />} />
          </Route>
          <Route path='/person' element={<People />} />
          <Route path='/person/details/:id' element={<PersonDetails />} />
          <Route path="*" element={<Notfound />} />                
      </Routes>
      
    </div>
  )
}

export default App