import React from 'react';
import ReactDom from 'react-dom';
import Feed from './Twit/Feed';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
          </div>

          <div className="col-8">
            <div clssName="row">
              <div className="col-12">
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
