import React, { Component } from 'react';
import { Search, Header, Table, HeaderCell, Row, Cell, Label, Button, Grid, Column, Container, Menu, Divider, Segment, Image, Popup, Input } from 'semantic-ui-react'
// Form, Field, Group, Input, Select, Label, Radio, TextArea, Checkbox, Button
import * as LABELS from '../constants/labels';

export class BaseRecord extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showValues = this.props.valuesList.map( label =>
      <Table.Row key={label}>
        <Table.Cell>{label}</Table.Cell>
      </Table.Row>
    );
    return (
      <Container style={{ marginTop: '3em' }} textAlign='left'>
        <Grid
          columns={1}
          style={{ width: 600 }}
          textAlign='left'>
          <Grid.Column>
            <Header>{this.props.title}</Header>
          </Grid.Column>
          <Grid.Column>
            <Search
              loading={false}
              onSearchChange={this.props.searchHandler}
              value={this.props.searchValue}
              open={false}
            />
          </Grid.Column>
          <Grid.Column>
            <Button onClick={this.props.newHandler}>Add</Button>
            <Popup
              trigger={<Button icon>Add Complex</Button>}
              content={
                <Grid
                  style={{ width: 300 }}
                  textAlign='left'
                  float='left'>
                  <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'><Label size="huge">New</Label></Grid.Column>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row columns={2}>
                    <Grid.Column width={3}><Label>Name</Label></Grid.Column>
                    <Grid.Column><Input/></Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column width={3}><Label>Price</Label></Grid.Column>
                    <Grid.Column><Input/></Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column textAlign='center'><Button>Confirm</Button></Grid.Column>
                    <Grid.Column textAlign='center'><Button>Cancel</Button></Grid.Column>
                  </Grid.Row>
                </Grid>
              }
              on='click'
              hideOnScroll
            />
          </Grid.Column>
        </Grid>
        <Divider/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{this.props.fieldsList}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {showValues}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>
                <Header as="h5">Count: {this.props.valuesList.length}</Header>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

export default BaseRecord;
