import React, { Component } from 'react';
var createReactClass = require('create-react-class');

var Todoist = createReactClass ({

  getInitialState: function() {
      return {
        todoists: []
      };
  },

  componentDidMount() {
    const get = () => {
      fetch('/api/todoist')
        .then(res => res.json())
        .then(todoists => this.setState({ todoists }));
    }
    setInterval(get, 60000);
    get();
   },

  render() {
    return (
      <div>
        <div className="single-twit">
          {this.state.todoists.map(todoist =>
            <ul key={todoist.id}>
              <li>{todoist.content}</li>
            </ul>
          )}
        </div>
      </div>
    );
  }
});

export default Todoist;
