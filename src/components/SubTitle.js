import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';

export class SubTitle extends Component {
  render() {
    const fullTitle = this.props.pages.map(
      (item,index,arr) => (index !== arr.length -1) ? (
        <span key={index}>
          <Button onClick={ e => this.props.action(item,e)}>{item}</Button>
          {"->"}
        </span>
      ) : item
    )

    return (
      <Header as='h4' textAlign='center'>
        {fullTitle}
      </Header>
    )
  }
}
