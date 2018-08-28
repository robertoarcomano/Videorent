import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Menu } from 'semantic-ui-react'
import MenuVideo from './MenuVideo';
import Main from './Main';

class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="subRoot">
        <div id="menu">
          <MenuVideo/>
        </div>
        <div id="main">
          <Main/>
        </div>
      </div>
    )
  }
}

export default Root;
