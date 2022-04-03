import React from 'react';
import axios from "axios"
import {BrowserRouter  as Router, Link, Routes, Route} from "react-router-dom"
import Movies from "./pages/Movies"
import Series from "./pages/Shows"

const apiHome = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=9861e56701727130aa2566b05b0412b0&language=en-US&page=1"
})

export default class App extends React.Component{

state = {
  listFilmes: []
}






  render(){
    return(
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li><Link to="/Movies">Filmes</Link></li>
            <li><Link to="/Shows">Séries</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/Movies" element={<Movies/>}/>
          <Route path="/Shows" element={<Series/>}/>
        </Routes>
        <Movies/>
      </Router>
    )
  }
}

//chave API 9861e56701727130aa2566b05b0412b0
//link API https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1