import React from 'react';
import axios from "axios";
import styled from "styled-components";


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
        <h1>Filmes</h1>
        <input type="text" placeholder="Busque o filme" onChange={this.search}/>
        {this.state.filmesSearch.map((item) =>(
          <div>
            <p>{item.title}</p>
            <img src={item.poster_path} alt={`Imagem do filme ${item.title}`}/>

          </div>
        ))}
      </div>
    )
  }
}
