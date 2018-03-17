import React, { Component } from 'react';
var createReactClass = require('create-react-class');

var Weather = createReactClass ({

  getInitialState: function() {
      return {
        temperature: ''
      };
  },

  componentDidMount() {
    const get = () => {
      fetch('/api/weather')
        .then(res => res.json())
        .then(temperature => this.setState({ temperature }));
    }
    setInterval(get, 60 * 60000);
    get();
   },

  render() {
    return (
      <div>
        <div className="weather">
          {this.state.temperature}
        </div>
      </div>
    );
  }
});

export default Weather;
