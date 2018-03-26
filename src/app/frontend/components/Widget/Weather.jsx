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
        <div className="col-12 weather">
          <h1>{today.name}</h1>
          <p>{today.temp}°C & {today.text}</p>
          <p>Wind: {today.wind} </p>
          <p>Humidity: {today.humid}</p>
        </div>
       </div>
     );
   },

  render() {
    let today = this.state.dataWeather[1];
    return (
      <div>
        <div>
            {this.getToday(today)}
        </div>
      </div>
    );
  }
});

export default Weather;
