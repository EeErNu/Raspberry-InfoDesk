import React from 'react';
import ReactDom from 'react-dom';
import socketIoClient from 'socket.io-client';
// import Weather from './Widget/Weather';
import Watch from './Widget/Watch';
// import Toggl from './Widget/Toggl';
// import Player from './Widget/Player';

//THE BELOW COMPONENTS ARE FIXED AND READY TO USE
import TechNews from './Twit/TechNews';
import GeneralNews from './Twit/GeneralNews';
import Todoist from './Widget/Todoist';

class App extends React.Component {
  render() {

    const socket = socketIoClient("http://localhost:7070");

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <div className="col-12">
                <Watch />
              </div>

              <div className="col-12">
                weather
              </div>

              <div className="col-12">
                todoist
                <Todoist socket = {socket} />
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className="row">
              <div className="col-12">
                toggl
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <div className="row">

                  <div className="over-twit col-6">
                    <div className="long">
                      <h1>TechNews</h1>
                      <TechNews socket = {socket} />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="row">

                      <div className="over-twit col-12">
                        <div className="short">
                          <h1>Radio</h1>

                        </div>
                      </div>
                      <div className="over-twit short col-12">
                        <div className="short">
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
        </div>
      </div>
    );
  }
}

export default App;
