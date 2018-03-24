import React, { Component } from 'react';
var createReactClass = require('create-react-class');
import socketIoClient from 'socket.io-client';

class TechNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      socket: this.props.socket
    };
  }

  componentDidMount() {
    this.state.socket.on("tweetTech", (tweet) => {
      const tweets = this.state.tweets.slice(0, 4);
      tweets.unshift(tweet);
      this.setState({ tweets })
    });
  }

  render() {
    return (
      <div>
        {this.state.tweets.map(tweet => (
          <div className="newsSingle" key={tweet.id}>
            <p>{tweet.text}</p>
            <em>by @{tweet.name}</em>
          </div>
        ))}
      </div>
    );
  }
}

export default TechNews;
