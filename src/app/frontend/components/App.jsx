import React from 'react';
import ReactDom from 'react-dom';
import Feed from './Twit/Feed';
import NewsFirst from './Twit/NewsFirst';
import NewsSecond from './Twit/NewsSecond';
import Weather from './Widget/Weather';
import Watch from './Widget/Watch';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
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

          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <div className="row">

                  <div className="over-twit col-6">
                    <NewsFirst />
                  </div>
                  <div className="over-twit col-6">
                    <NewsSecond />
                  </div>
                  <div className="over-twit col-12">
                    <Feed />
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
