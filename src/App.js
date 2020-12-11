import React, { Component } from "react";
import axios from "axios";
import Search from "./Components/Search";
import Days from "./Components/Days";
import styles from "./App.module.css";
import Chart from "./Components/Chart.js";
import { connect } from "react-redux";
const API_KEY = "4c99be4d39baa4dbbc593d7f47aad8d6";

class App extends Component {
  temparray = [];

  fetchWeatherDetails() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.props.getCityName}&appid=` +
          API_KEY
      )
      .then((response) => {
        console.log(response);
        this.props.weatherData(response.data);
        return response;
      })
      .then((dataold) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.latitude}&lon=${this.props.longitude}&appid=` +
              API_KEY
          )
          .then((response2) => {
            this.props.weatherDailyData(response2.data);
            return response2;
          })
          .then((response3) => {
            for (let i = 0; i < 24; i++) {
              this.temparray.push(Math.floor(this.props.hourly[i].temp - 273)); //converting Kelvin into Celsius
            }
            return response3;
          });
      });
  }

  componentDidMount() {
    this.fetchWeatherDetails();
  }

  componentDidUpdate() {
    if (this.props.isSearched) {
      this.fetchWeatherDetails();
      this.props.setIsSearched(false);
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <Search getFromSearch={this.props.setCityName} />

        <div className={styles.daily_data}>
          {this.props.getWeatherDailyData.map((day) => (
            <Days key={day.clouds} day={day} id={day.weather[0].id} />
          ))}
        </div>

        <Chart
          temparray={this.temparray}
          temp={this.props.temp}
          pressure={this.props.pressure}
          humidity={this.props.humidity}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCityName:      (cityName, isSearched)  =>dispatch({type: "CITY_NAME",value: { cityName: cityName, isSearched: isSearched },}),
    weatherData:      (data)                  => dispatch({ type: "WEATHER_DATA", value: data }),
    weatherDailyData: (weatherDailyData)      =>dispatch({ type: "WEATHER_DAILY_DATA", value: weatherDailyData }),
    setIsSearched:    (isSearched)            => dispatch({ type: "IS_SEARCHED", value: isSearched })
    
  };
};

const mapStateToProps = (state) => {
  return {
    getCityName: state.cityName,
    latitude: state.lat,
    longitude: state.lon,
    getWeatherDailyData: state.daily,
    humidity: state.humidity,
    pressure: state.pressure,
    hourly: state.hourly,
    temp: state.temp,
    isSearched: state.isSearched,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
