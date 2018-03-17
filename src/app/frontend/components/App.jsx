import React from 'react';
import ReactDom from 'react-dom';
import Feed from './Twit/Feed';
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
            <div clssName="row">
              <div className="col-12">
                <div className="row">
                </div>
                <Feed />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
