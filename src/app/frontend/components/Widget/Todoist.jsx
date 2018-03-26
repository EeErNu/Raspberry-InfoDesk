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
      this.setState({ todoists: todoist.reverse().slice(0, 5) });
    });
  }

  render() {
    return (
      <div>
        {this.state.todoists.map(todoist => (
          <div className="task" key={todoist.id}>
            <div className="row">
              <div className="date col-12">
                <b>Added: <em>{todoist.added}</em></b>
                <b>Due to: <em>{todoist.due}</em></b>
              </div>
              <div className="col-12">
                <p>{todoist.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Todoist;
