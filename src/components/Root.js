import React, { Component } from 'react';
import MenuVideo from './MenuVideo';
import Main from './Main';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Root extends Component {
  render() {
    return (
      <Container style={{ marginTop: '1em',width: 600 }}>
        <Container>
          <MenuVideo/>
        </Container>
        <Container style={{ marginTop: '1em'}} >
          <Main/>
        </Container>
      </Container>
    )
  }
}

export default Root;
