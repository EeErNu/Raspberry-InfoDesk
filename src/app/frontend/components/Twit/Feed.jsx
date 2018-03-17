import React, { Component } from 'react';
var createReactClass = require('create-react-class');

var Feed = createReactClass ({

  getInitialState: function() {
      return {
        tweets: []
      };
  },

  componentDidMount() {
    const get = () => {
      fetch('/api/tweet')
        .then(res => res.json())
        .then(tweets => this.setState({ tweets }));
    }
    setInterval(get, 5 * 1000);
    get();
   },

  render() {
    return (
      <div>
        <div className="feed">
          {this.state.tweets.map(tweet =>
            <div key={tweet.id}>
              <p>{tweet.text}</p>
              <em>by @{tweet.name}</em>
            </div>
          )}
        </div>
      </div>
    );
  }
});

export default Feed;
