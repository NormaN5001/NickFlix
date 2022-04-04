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
  border-radius: 5px;
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
const MovieInfo = styled.div`
  width: 275px;
  height: 400px;
  background-color: #1b1919;
  border-radius: 7px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const MovieImg = styled.img`
  margin-top: 20px;
  width: 200px;
  transition: 0.7s;
  &:hover{
    cursor: pointer;
    width: 230px;
    margin-top: 10px;
  }
`
const MovieName = styled.p`
  font-size: 2vh;
  font-weight: bold;
  color: white;
  text-align: center;
`


const apiFilmes = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=9861e56701727130aa2566b05b0412b0&language=en-US&page=1"
})

export default class App extends React.Component{

state = {
  listFilmes: [],
  filmesSearch: []
}

async componentDidMount(){
  this.getFilmes()
}

getFilmes = async () =>{
  const response = await apiFilmes.get()
  const filmes = response.data.results.map((item) => {
    return{
      ...item,
      poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
    }
  })
  this.setState({
    listFilmes: filmes,
    filmesSearch: filmes
  })
}

search = (event) =>{
  let {listFilmes} = this.state
  const FilmesFil = listFilmes.filter((item) => {
    if(item.title.toLowerCase().includes(event.target.value.toLowerCase())){
      return true
    }
  })
  this.setState({
    filmesSearch: FilmesFil
  })
}



  render(){
    return(
      <div>
      <GlobalStyle/>
        <Input type="text" placeholder="Busque o filme" onChange={this.search}/>
        <Title>Filmes</Title>
        <Container>
        {this.state.filmesSearch.map((item, index) =>(
          <MovieInfo>
              <MovieName>{item.title}</MovieName>
              <MovieImg src={item.poster_path} alt={`Imagem do filme ${item.title}`}/>
          </MovieInfo>
        ))}
      </Container>
      </div>
    )
  }
}
