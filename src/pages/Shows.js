import React from 'react';
import axios from "axios";
import styled from "styled-components";


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
        <h1>Series</h1>
        <input type="text" placeholder="Busque a série" onChange={this.handleChange}/>
        {this.state.seriesSearch.map((item) =>(
          <div>
            <p>{item.name}</p>
            <img src={item.poster_path} alt={`Imagem da série ${item.name}`}/>

          </div>
        ))}
      </div>
    )
  }
}
