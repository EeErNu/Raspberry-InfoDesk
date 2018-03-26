
import Player from './Widget/Player';

//THE BELOW COMPONENTS ARE FIXED AND READY TO USE
import React from 'react';
import ReactDom from 'react-dom';
import socketIoClient from 'socket.io-client';

import TechNews from './Twit/TechNews';
import GeneralNews from './Twit/GeneralNews';
import Todoist from './Widget/Todoist';
import Toggl from './Widget/Toggl';
import Watch from './Widget/Watch';
import Weather from './Widget/Weather';
import Forecast from './Widget/Forecast';

class App extends React.Component {
  render() {

    const socket = socketIoClient("http://localhost:7070");

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="row">

              <div className="row col-12">
                <div className="col-6">
                  <Watch />
                  <Toggl socket = {socket} />
                </div>
                <div className="col-6">
                  <Weather socket = {socket} />
                </div>
              </div>

              <div className="col-12">
                <Forecast socket = {socket} />
              </div>

              <div className="col-12">
                <div className="radio">
                  <Player />
                </div>
              </div>

            </div>
          </div>

          <div className="col-8">
            <div className="row news">
              <div className="col-6">
                <div className="newsLong">
                  <h1>TechNews</h1>
                  <TechNews socket = {socket} />
                </div>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-12">
                    <h1>Tasks</h1>
                    <Todoist socket = {socket} />
                  </div>
                  <div className="col-12">
                    <div className="newsShort">
                      <h1>EestiNews</h1>
                      <GeneralNews socket = {socket} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
