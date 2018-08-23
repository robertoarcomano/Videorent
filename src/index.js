import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MenuVideo from './MenuVideo';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<MenuVideo />, document.getElementById('menu'));
registerServiceWorker();
