import React from 'react';
import ReactDom from 'react-dom';
import TechNews from './Twit/TechNews';
import GeneralNews from './Twit/GeneralNews';
import Weather from './Widget/Weather';
import Watch from './Widget/Watch';
import Toggl from './Widget/Toggl';

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

              </div>
            </div>
          </div>

          <div className="col-2">
            <div className="row">
              <div className="col-12">
                Tg w/h
                <Toggl />
              </div>
              <div className="col-12">
                Personal w/h
                <Toggl />
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <div className="row">

                  <div className="over-twit col-6">
                    <h1>Git info is here</h1>
                  </div>
                  <div className="over-twit col-6">
                    <h1>Voice Recognition for music player</h1>
                  </div>
                  <div className="over-twit col-6">
                    <h1>TechNews</h1>
                    <TechNews />
                  </div>
                  <div className="over-twit col-6">
                    <h1>EestiNews</h1>
                    <GeneralNews />
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
