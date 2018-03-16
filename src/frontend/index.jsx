import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';

import './style/index.scss';

ReactDom.render(
  <App />,
  document.getElementById('root')
);

// Hot Module Replacement
// if (module.hot) {
//   module.hot.accept();
// }
