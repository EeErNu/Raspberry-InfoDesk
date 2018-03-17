import React from 'react';
import ReactDom from 'react-dom';

export default class Watch extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     date: new Date()
   };
 }

 componentDidMount() {
   this.timerID = setInterval(
     () => this.tick(),
     1000
   );
 }

 componentWillUnmount() {
   clearInterval(this.timerID);
 }

 tick() {
   this.setState({
     date: new Date()
   });
 }
  render() {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return (
      <div>
        <h2>It is {this.state.date.toLocaleString("en-US", options)}.</h2>
      </div>
    );
  }
}
