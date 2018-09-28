import React, { Component } from 'react';
import { Search, Header, Label, Button, Grid, Container, Divider, Popup, Input } from 'semantic-ui-react';
import * as LABELS from '../constants/labels';

export class SubTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fullTitle = this.props.pages.map(
      (item,index,arr) => (index != arr.length -1) ? (
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
