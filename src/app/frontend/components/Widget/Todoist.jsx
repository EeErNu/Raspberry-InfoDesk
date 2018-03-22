import React, { Component } from 'react';
var createReactClass = require('create-react-class');
import socketIoClient from 'socket.io-client';

class Todoist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoists: [],
      socket: this.props.socket
    };
  }

  componentDidMount() {
    this.state.socket.on("todoist", (todoist) => {
      this.setState({ todoists: todoist.reverse().slice(0, 9) });
    });
  }

  render() {
    return (
      <div>
        {this.state.todoists.map(todoist => (
          <div key={todoist.id}>{todoist.content}</div>
        ))}
      </div>
    );
  }
}

export default Todoist;
