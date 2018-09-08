import React, { Component } from 'react';
import { Search, Header, Table, Label, Button, Grid, Container, Divider, Popup, Input } from 'semantic-ui-react'
import { table } from './table'

export class BaseRecord extends Component {
  updateRecord(record) {
    this.setState({ isPopupOpen: this.state.isPopupOpen, record: record } )
  }

  onChangeRecord(name, value) {
    var tmpRecord = this.state.record;
    tmpRecord[name] = value;
    this.updateRecord(tmpRecord);
  }

  resetEditingRecord() {
    var tmpRecord = {}
    this.props.fieldsList.forEach( field => tmpRecord[field] = "" )
    this.updateRecord(tmpRecord);
  }

  loadEditingRecord(key) {
    var tmpRecord = {}
    this.props.valuesList.filter( item => JSON.stringify(item) === JSON.stringify(key)).forEach( item => tmpRecord = Object.assign({}, item) );
    this.updateRecord(tmpRecord);
  }

  constructor(props) {
    super(props);
    this.confirmRecord = this.confirmRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.loadEditingRecord = this.loadEditingRecord.bind(this);
    this.resetEditingRecord = this.resetEditingRecord.bind(this);
    this.showEditNew = this.showEditNew.bind(this);
    this.hideEditNew = this.hideEditNew.bind(this);
    this.onChangeRecord = this.onChangeRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.state = {
      isPopupOpen: false,
      record: {},
      isNew: true
    };
  }

  showEditNew(key) {
    this.resetEditingRecord()
    let isNew = (key !== undefined) ? false : true
    if (key !== undefined) {
      this.loadEditingRecord(key)
    }
    this.setState({ isPopupOpen: true, isNew: isNew })
  }

  hideEditNew() {
    this.setState({ isPopupOpen: false })
  }

  confirmRecord(e) {
    if (this.state.isNew)
      this.props.newHandler(Object.assign({}, this.state.record))
    else
      this.props.updateHandler(Object.assign({}, this.state.record))
    this.resetEditingRecord();
    this.hideEditNew()
  }

  deleteRecord(e) {
    this.props.deleteHandler(Object.assign({}, this.state.record))
    this.resetEditingRecord();
    this.hideEditNew()
  }

  render() {
    const title = (
      <Header>{this.props.title}</Header>
    )

    const search = (
      <Search
        loading={false}
        onSearchChange={this.props.searchHandler}
        value={this.props.searchValue}
        open={false}
      />
    )

    const popupTitle = (
      <Grid.Column textAlign='center'><Label size="huge">{this.state.isNew?"New":"Update"} {this.props.title}</Label></Grid.Column>
    )

    const popupFields = this.props.fieldsList.map( (label,index) =>
      <Grid.Row key={label} columns={2}>
        <Grid.Column width={3}><Label>{label}</Label></Grid.Column>
        <Grid.Column><Input readOnly={ (!this.state.isNew && index === 0) ? true : false } onChange={e => this.onChangeRecord(label,e.target.value)} value={this.state.record[label]}/></Grid.Column>
      </Grid.Row>
    );

    const popupButtons = (
      <Grid.Row columns={3}>
        <Grid.Column textAlign='center'><Button onClick={e => this.confirmRecord(e)}>Confirm</Button></Grid.Column>
        <Grid.Column textAlign='center'><Button onClick={e => this.deleteRecord(e)}>Delete</Button></Grid.Column>
        <Grid.Column textAlign='center'><Button onClick={this.hideEditNew}>Cancel</Button></Grid.Column>
      </Grid.Row>
    );

    const popup = (
      <Popup
        trigger={<Button icon onClick={e => this.showEditNew()}>Add</Button>}
        content={
          <Grid style={{ width: 400 }} textAlign='left' float='left'>
            <Grid.Row columns={1}>
              {popupTitle}
            </Grid.Row>
            <Divider/>
            {popupFields}
            {popupButtons}
          </Grid>
        }
        open={ this.state.isPopupOpen }
        on='click'
        hideOnScroll
        position="right center"
        size="tiny"
        verticalOffset={100}
      />
    )
 // style={{ marginTop: '3em',width: 600 }} textAlign='left'
    return (
      <Container>
      {title}
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column textAlign='left'>
            {search}
          </Grid.Column>
          <Grid.Column textAlign='left'>
            {popup}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      { table(this.props.fieldsList,this.props.valuesList,this.showEditNew) }
      </Container>
    );
  }
}

export default BaseRecord;
