import React, { Component } from 'react';
import MenuVideo from './MenuVideo';
import Main from './Main';

class Root extends Component {
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
