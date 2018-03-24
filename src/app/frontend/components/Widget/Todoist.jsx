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
      this.setState({ todoists: todoist.reverse().slice(0, 2) });
    });
  }

  render() {
    return (
      <div>
        {this.state.todoists.map(todoist => (
          <div className="task" key={todoist.id}>
            <div className="row">
              <div className="col-6">
                <em>Added: {todoist.added}</em>
              </div>
              <div className="col-6">
                <div className="dueto">
                  <em>Due to: {todoist.due}</em>
                </div>
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
