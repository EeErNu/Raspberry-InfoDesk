import React, { Component } from 'react';
var createReactClass = require('create-react-class');

var Weather = createReactClass ({

  getInitialState: function() {
      return {
        dataWeather: []
      };
  },

  componentDidMount() {
    const get = () => {
      fetch('/api/weather')
        .then(res => res.json())
        .then(dataWeather => this.setState({ dataWeather }));
    }
    setInterval(get, 30 * 60000);
    get();
   },

   getToday(today) {
     today = today || {
       name:"name",
       temp:"temp",
       text:"text",
       wind:"wind",
       humid:"humid"
     }
     return(
       <div className="row">
        <div className="col-12">
          <h2>{today.name}</h2>
          <h3>{today.temp}°C</h3>
          <p>{today.text}</p>
          <em>Wind: {today.wind} </em>
          <em>Humidity: {today.humid}</em>
        </div>
       </div>
     );
   },

   getForcast(forecast) {
     forecast = forecast || [{
       low: 'low',
       high: 'high',
       day: 'shortday',
       date: 'date'
     }];
     return(
      <div className="row">
          {forecast.map(item=>(
            <div className="row col-4">
              <div className="col-6">
                {item.low}°C
              </div>
              <div className="col-6">
                {item.high}°C
              </div>
              <div className="col-12">
                <h3>{item.day}</h3>
                <em>{item.date}</em>
              </div>
            </div>
          ))}
      </div>
     );
   },

  render() {
    let today = this.state.dataWeather[1];
    let forecast = this.state.dataWeather[0];
    return (
      <div>
        <div className="single-twit">
          <div>
            <h1>Today</h1>
            {this.getToday(today)}
          </div>
          <div>
            <h1>Forcast</h1>
            {this.getForcast(forecast)}
          </div>
        </div>
      </div>
    );
  }
});

export default Weather;
