import React, { Component } from 'react';

const createReactClass = require('create-react-class');

const Toggl = createReactClass({

  getInitialState() {
    return {
      duration: [],
    };
  },

  componentDidMount() {
    const get = () => {
      fetch('/api/toggl')
        .then(res => res.json())
        .then(duration => this.setState({ duration }));
    };
    setInterval(get, 5 * 1000);
    get();
  },

  render() {
    return (
      <div>
        <div className="single-twit">
          {this.state.duration.map(dur =>
            <div>
              <h1>TG w/h</h1>
              <p>{dur.duration}</p>
            </div>
          )}
        </div>
      </div>
    );
  },
});

export default Toggl;
