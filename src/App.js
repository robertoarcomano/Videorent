import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { response: "init"}
    this.checkApi = this.checkApi.bind(this)
  }
  checkApi() {
    return fetch("/ping", { method: 'get'} )
    .then(response => response.json())
    .then(response => {
      this.setState({ response: response.response})
    })
  }
  render() {
    return (
      <div className="App">
        <p>
          <button onClick={this.checkApi}>ping</button>
          <span> Results: {this.state.response}</span>
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
