import React, { Component } from "react"
import axios from 'axios'
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
`
const Container = styled.section`
  margin: 5vw 5vw 0 5vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
const Title = styled.h1`
  color: white;
  text-align: center;
  margin-top: 30px;
`
const MidiaImg = styled.img`
  width: 200px;
  height: 320px;
  transition: 0.7s;
  &:hover{
    cursor: pointer;
    width: 230px;
    height: 350px;
  }
`
const MidiaInfo = styled.div`
  margin-top: 30px;
  width: 250px;
  height: 350px;
  background-color: #1b1919;
  border-radius: 7px;

  display: flex;
  justify-content: center;
`


const apiTrending = axios.create({
  baseURL: "https://api.themoviedb.org/3/trending/all/day?api_key=9861e56701727130aa2566b05b0412b0"
})

export default class App extends React.Component{

state = {
        midia: [],
        midiaSearch: []
      }

    componentDidMount(){
        this.getTrending()
    }
    
    getTrending = async () => {
        const response = await apiTrending.get()
        const trending = response.data.results.map((item) => {
            return{
                ...item,
                poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
            }
        })
    
        this.setState({
            midia: trending,
        })
    }




render(){
    return(
      <div>
        <GlobalStyle/>
        <Title>Em alta</Title>
        <Container>
          {this.state.midia.map((item)=> (
            <MidiaInfo>
              <MidiaImg src={item.poster_path} alt={`Iagem de ${item.name}`}/>
            </MidiaInfo>
          ))}
        </Container>
      </div>
    )
  }
}
