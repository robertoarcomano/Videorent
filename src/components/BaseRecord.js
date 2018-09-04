import React, { Component } from 'react';
import { Search, Header, Table, HeaderCell, Row, Cell, Label, Button, Grid, Column, Container, Menu, Divider, Segment, Image, Popup, Input } from 'semantic-ui-react'
// Form, Field, Group, Input, Select, Label, Radio, TextArea, Checkbox, Button
import * as LABELS from '../constants/labels';

export class BaseRecord extends Component {
  resetNewRecord() {
    this.props.fieldsList.forEach( field => this.newRecord[field] = "")
  }

  constructor(props) {
    super(props);
    this.newRecord = {}
    this.addRecord = this.addRecord.bind(this);
    this.resetNewRecord = this.resetNewRecord.bind(this);
    this.showNew = this.showNew.bind(this);
    this.hideNew = this.hideNew.bind(this);
    this.resetNewRecord();
    this.state = {
      newOpen: false
    };
  }

  showNew() {
    this.setState({ newOpen: true })
  }

  hideNew() {
    this.setState({ newOpen: false })
  }

  addRecord(e) {
    console.log("e: " + e.type)

    this.props.newHandler(Object.assign({}, this.newRecord))
    this.resetNewRecord();
    this.hideNew()
  }

  render() {
    const getNewFields = this.props.fieldsList.map( label =>
      <Grid.Row key={label} columns={2}>
        <Grid.Column width={3}><Label>{label}</Label></Grid.Column>
        <Grid.Column><Input onChange={e => this.newRecord[label] = e.target.value}/></Grid.Column>
      </Grid.Row>
    );

    const fieldsList = this.props.fieldsList.map( label =>
      <Table.HeaderCell key={label}>{label}</Table.HeaderCell>
    );
    const getTableCells = record =>
      this.props.fieldsList.map( field =>
        <Table.Cell key={record[field]}>{record[field]}</Table.Cell>
      )

    const showValues = this.props.valuesList.map( record =>
      <Table.Row key={record[this.props.fieldsList[0]]}>
        {getTableCells(record)}
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
            <Popup
              trigger={<Button icon onClick={this.showNew}>Add</Button>}
              content={
                <Grid
                  style={{ width: 300 }}
                  textAlign='left'
                  float='left'>
                  <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'><Label size="huge">New {this.props.title}</Label></Grid.Column>
                  </Grid.Row>
                  <Divider/>
                  {getNewFields}
                  <Grid.Row columns={2}>
                    <Grid.Column textAlign='center'><Button onClick={e => this.addRecord(e)}>Confirm</Button></Grid.Column>
                    <Grid.Column textAlign='center'><Button onClick={this.hideNew}>Cancel</Button></Grid.Column>
                  </Grid.Row>
                </Grid>
              }
              open={ this.state.newOpen }
              on='click'
              hideOnScroll
            />
          </Grid.Column>
        </Grid>
        <Divider/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {fieldsList}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {showValues}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
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
