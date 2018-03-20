// import React, { Component } from 'react';
// var createReactClass = require('create-react-class');
//
// var Weather = createReactClass ({
//
//   getInitialState: function() {
//       return {
//         temperature: ''
//       };
//   },
//
//   componentDidMount() {
//     const get = () => {
//       fetch('/api/weather')
//         .then(res => res.json())
//         .then(temperature => this.setState({ temperature }));
//     }
//     get();
//     setInterval(get, 30 * 60000);
//
//    },
//
//   render() {
//     return (
//       <div>
//         <div className="weather">
//           {this.state.temperature}
//         </div>
//       </div>
//     );
//   }
// });
//
// export default Weather;

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

  render() {
    return (
      <div>
        <div className="single-twit">
          {this.state.dataWeather.map(data =>
            <div>
              <p>{data.name}</p>
              <p>{data.temp}</p>
              <p>{data.text}</p>
              <p>{data.wind}</p>
              <p>{data.humid}</p>

              <p>
              {data.forceastDate}
              {data.forecastDay}
              {data.forecastLow}-
              {data.forecastHigh}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
});

export default Weather;
