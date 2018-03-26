import React, { Component } from 'react';
var createReactClass = require('create-react-class');
import socketIoClient from 'socket.io-client';

class Toggl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggls: [],
      socket: this.props.socket
    };
  }

  componentDidMount() {
    this.state.socket.on("toggl", (toggl) => {
      this.setState({ toggls: toggl.reverse().slice(0, 1) });
    });
  }

  render() {
    return (
      <div>
        {this.state.toggls.map(toggl => (
          <div className="wh" key={toggl.id}>
            <p>
              <b>tg:</b> <em>{toggl.duration}w/h</em>
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Toggl;
