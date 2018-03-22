import React from 'react';
import ReactDom from 'react-dom';
import TechNews from './Twit/TechNews';
import GeneralNews from './Twit/GeneralNews';
import Weather from './Widget/Weather';
import Watch from './Widget/Watch';
import Toggl from './Widget/Toggl';
import Player from './Widget/Player';
import Todoist from './Widget/Todoist';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <div className="row">
              <div className="col-12">
              </div>

              <div className="col-12">
                <Watch />
              </div>

              <div className="col-12">
                <Weather />
              </div>

              <div className="col-12">
                <Todoist />
              </div>
            </div>
          </div>

          <div className="col-2">
            <div className="row">
              <div className="col-12">
                <Toggl />
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <div className="row">

                  <div className="over-twit long col-6">
                    <h1>TechNews</h1>
                    <TechNews />
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="over-twit short col-12">
                        <h1>Radio</h1>
                        <Player />
                      </div>
                      <div className="over-twit short col-12">
                        <h1>EestiNews</h1>
                        <GeneralNews />
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
