import React from 'react';
import axios from "axios"
import {BrowserRouter  as Router, Link, Routes, Route} from "react-router-dom"
import Movies from "./pages//Movies"
import Series from "./pages//Shows"
import Home from "./pages//Home"
import Logo from "./img/logo.png"
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components"


const GlobalStyle = createGlobalStyle`
   *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body{
    background-color: #232323;
  }
`
const Header = styled.nav`
  background-color: #5f0ece;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
`
const LogoImg = styled.img`
  margin-left: 5vw;
  width: 140px;
  height: 30px;
`
const List = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  
`
const Item = styled.li`
  width: 6vw;
  text-align: center;
`


const apiHome = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=9861e56701727130aa2566b05b0412b0&language=en-US&page=1"
})

const Page = () =>{

    return(
      <Router>
      <GlobalStyle/>
        <Header>
          <LogoImg src={Logo}/>
          <List>
            <Item><Link to="/">Home</Link></Item>
            <Item><Link to="Movies">Filmes</Link></Item>
            <Item><Link to="Shows">Séries</Link></Item>
          </List>

        </Header>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="Movies" element={<Movies/>}/>
          <Route path="Shows" element={<Series/>}/>
        </Routes>
      </Router>
    )
  
}
export default Page

//chave API 9861e56701727130aa2566b05b0412b0
//link API https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1