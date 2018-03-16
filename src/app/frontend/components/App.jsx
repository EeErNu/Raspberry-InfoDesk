import React, { Component } from 'react';
var createReactClass = require('create-react-class');

var App = createReactClass ({

  getInitialState: function() {
      return {
        tweets: []
      };
  },

  componentDidMount() {
    const get = () => {
      fetch('/tweet')
        .then(res => res.json())
        .then(tweets => this.setState({ tweets }));
    }
    setInterval(get, 5 * 1000);
    get();
   },

  render() {
    return (
      <div>
        <table>
          {this.state.tweets.map(tweet =>
            <tr key={tweet.id}>
              <td>@{tweet.name}</td>
              <td>{tweet.text}</td>
            </tr>
          )}
        </table>
      </div>
    );
  }
});

export default App;
