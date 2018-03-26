import React, { Component } from 'react';
var createReactClass = require('create-react-class');
import socketIoClient from 'socket.io-client';

class GeneralNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      socket: this.props.socket
    };
  }

  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIoClient(endpoint);
    this.state.socket.on("tweetGeneral", (tweet) => {
      const tweets = this.state.tweets.slice(0, 2);
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

export default GeneralNews;
