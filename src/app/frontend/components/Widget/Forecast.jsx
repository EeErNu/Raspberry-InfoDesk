import React, { Component } from 'react';
var createReactClass = require('create-react-class');

var Forecast = createReactClass ({

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
            <div className="row col-12 forecast">

              <div className="day-date col-3">
                <em>{item.date}</em>
                <h3>{item.day}</h3>
              </div>

              <div className="temperature col-6">
                <p>
                  min: {item.low}°C -
                  max {item.high}°C
                </p>
              </div>

            </div>
          ))}
      </div>
     );
   },

  render() {
    let forecast = this.state.dataWeather[0];
    return (
      <div>
        <div>
          {this.getForcast(forecast)}
        </div>
      </div>
    );
  }
});

export default Forecast;
