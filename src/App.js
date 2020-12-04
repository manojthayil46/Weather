import React, { Component } from 'react';
import axios from 'axios';
import Search from './Components/Search';
import Days from './Components/Days';
import styles from './App.module.css';
import Chart from './Components/Chart.js'
const API_KEY = "ef0d6ed3298e2719d7764e3955b48fda";


export default class App extends Component {
  temparray = [];
  state = {
    daily : [],
    hourly : [],
    cityName: "Mumbai",
    isSearched: false,
    lon :'72.8479',
    lat:'19.0144',
    temp : '',
    pressure : '',
    humidity : ''
    
  }
  
  componentDidMount = () =>{
    this.fetchWeatherDetails(this.state.cityName);
  }

  componentDidUpdate(){
    if (this.state.isSearched) {
      this.fetchWeatherDetails();
      this.setState({
        isSearched: false,
      });
    }
  }

  
  fetchWeatherDetails = () => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=` +API_KEY).then(response => {
      
      this.setState({
        cityData: response.data.name,
        temp : response.data.main.temp,
        lat : response.data.coord.lat,
        lon : response.data.coord.lon,
        pressure : response.data.main.pressure,
        humidity : response.data.main.humidity
        
      },() =>{
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lat}&appid=${API_KEY}`).then(response => {
      this.setState({
        daily : response.data.daily,
        hourly : response.data.hourly
      },() =>{
        for(let i = 0 ; i < 24; i++){
          this.temparray.push(Math.floor(this.state.hourly[i].temp - 273)); //converting Kelvin into Celsius
        }

      })

    })
      });
    })
  }
//This will get the city name from the search input and update the state
  getCityName = (cityName) => {
    this.setState({
      cityName: cityName,
      isSearched: true,
    });
  };

  render() {
    return ( 
      
      <div className = {styles.app}>
        
        <Search getCityName={this.getCityName} />

        <div className = {styles.daily_data}>
         {this.state.daily.map(day => 
        <Days 
        key = {day.clouds} 
        day = {day}
        id = {day.weather[0].id}
        description = {day.weather[0].description} />
        )}       
        </div>

        <Chart 
        temparray = {this.temparray}
        temp = {this.state.temp}
        pressure = {this.state.pressure}
        humidity = {this.state.humidity} />
      </div>
      
     
    )
  }
}
