import React from 'react';
import axios from "axios";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
`

const Input = styled.input`
  position: absolute;
  top: 17px;
  right: 37vw;
  height: 30px;
  width: 25vw;
  border-style: none;
  text-align: center;
  z-index: 2;
`
const Title = styled.h1`
  color: white;
  text-align: center;
  margin-top: 30px;
`
const Container = styled.section`
  margin: 3vh 5vw 0 5vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
const SerieInfo = styled.div`
  width: 275px;
  height: 400px;
  background-color: #1b1919;
  border-radius: 7px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const SerieImg = styled.img`
  margin-top: 20px;
  width: 200px;
  transition: 0.7s;
  &:hover{
    cursor: pointer;
    width: 230px;
    margin-top: 10px;
  }
`
const SerieName = styled.p`
  font-size: 2vh;
  font-weight: bold;
  color: white;
  text-align: center;
`

const apiSeries = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=9861e56701727130aa2566b05b0412b0&language=en-US&page=1"
})

export default class App extends React.Component{

state = {
  tvSeries: [],
  seriesSearch: []
}

async componentDidMount(){
  this.getSeries()
}

getSeries = async () =>{
  const response = await apiSeries.get()

  const series = response.data.results.map((item) => {
    return{
      ...item,
      poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
    }
  })

  this.setState({
    tvSeries: series,
    seriesSearch: series
  })
}

handleChange = (e) =>{
  const seriesFilter = this.state.tvSeries.filter((item) => {
    if(item.name.toLowerCase().includes(e.target.value.toLowerCase())){
      return true;
    }
  })

  this.setState({
    seriesSearch: seriesFilter,
  })
}

  render(){
    return(
      <div>
        <GlobalStyle/>
        <Title>Series</Title>
        <Container>
        <Input type="text" placeholder="Busque a série" onChange={this.handleChange}/>
        {this.state.seriesSearch.map((item) =>(
          <SerieInfo>
            <SerieName>{item.name}</SerieName>
            <SerieImg src={item.poster_path} alt={`Imagem da série ${item.name}`}/>
          </SerieInfo>
        ))}
        </Container>
      </div>
    )
  }
}
