import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import store from './store/index';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
