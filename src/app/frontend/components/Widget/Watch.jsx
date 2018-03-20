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
    var time = {
      hour: 'numeric',
      minute: 'numeric',
    };
    var date = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'short',
    };

    return (
      <div>
        <h1>{this.state.date.toLocaleString("en-EE", time)}</h1>
        <p>{this.state.date.toLocaleString("en-EE", date)}</p>
      </div>
    );
  }
}
