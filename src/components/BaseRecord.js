import React, { Component } from 'react';
import { Search, Header, Label, Button, Grid, Container, Divider, Popup, Input } from 'semantic-ui-react';
import { table } from './table';
import { SubTitle } from './SubTitle';
import * as LABELS from '../constants/labels';
import  '../constants/labels';
import { arrayToJson } from '../constants/utils.js'

export class BaseRecord extends Component {
  constructor(props) {
    super(props);
    this.confirmRecord = this.confirmRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.onChangeRecord = this.onChangeRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.goToAdd = this.goToAdd.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
    this.getPage = this.getPage.bind(this);
    this.backTo = this.backTo.bind(this);
    this.isNew = this.isNew.bind(this);
    this.state = {
      page: LABELS.MAIN_PAGE,
      pages: [ LABELS.MAIN_PAGE ],
      record: {}
    };
  }

  isNew() {
    return this.getPage() === LABELS.NEW
  }

  getPage() {
    return this.state.pages[this.state.pages.length-1]
  }

  backTo(page = this.state.pages[this.state.pages.length - 2]) {
    this.setState( { pages: this.state.pages.slice(0,this.state.pages.indexOf(page)+1) } )
  }

  updateRecord(record,pageToAdd=null) {
    const pages = (pageToAdd === null ? this.state.pages : this.state.pages.concat(pageToAdd))
    this.setState( { record: record, pages: pages } )
  }

  goToAdd() {
    // Solution #1 => Use string to manipulate JSON
    // const record = this.props.fieldsList.reduce( (x,y,index,arr) => arrayToJson(x,y,index,arr) )

    // Solution #2 => Use function on object
    const record = {}
    record.setValue = function(a,b) {
      this[a]=b;
    }
    this.props.fieldsList.forEach( item => record.setValue(item,""))
    this.updateRecord(record,LABELS.NEW)
  }

  goToEdit(key) {
    const record = Object.assign({}, key)
    this.updateRecord(record,LABELS.EDIT);
  }

  onChangeRecord(name, value) {
    const tmpRecord = Object.defineProperty(Object.assign({}, this.state.record), name, { value: value });
    this.updateRecord(tmpRecord);
  }

  confirmRecord() {
    if (this.isNew())
      this.props.newHandler(Object.assign({}, this.state.record))
    else
      this.props.updateHandler(Object.assign({}, this.state.record))
    this.backTo()
  }

  deleteRecord() {
    this.props.deleteHandler(Object.assign({}, this.state.record))
    this.backTo()
  }

  render() {
    const search = (
      <Search
        loading={false}
        onSearchChange={this.props.searchHandler}
        value={this.props.searchValue}
        open={false}
      />
    )

    const popupFields = this.props.fieldsList.map( (label,index) =>
      <Grid.Row key={label} columns={2}>
        <Grid.Column width={3}><Label>{label}</Label></Grid.Column>
        <Grid.Column><Input readOnly={ (!this.isNew() && index === 0) ? true : false } onChange={e => this.onChangeRecord(label,e.target.value)} value={this.state.record[label]}/></Grid.Column>
      </Grid.Row>
    );

    const popupButtons = (
      <Grid.Row columns={3}>
        <Grid.Column textAlign='center'><Button onClick={e => this.confirmRecord()}>Confirm</Button></Grid.Column>
          <Grid.Column textAlign='center'>
            { this.getPage() == LABELS.EDIT ? (<Button onClick={e => this.deleteRecord()}>Delete</Button>) : "" }
          </Grid.Column>
        <Grid.Column textAlign='center'><Button onClick={e => this.backTo()}>Cancel</Button></Grid.Column>
      </Grid.Row>
    );

    const addButton = (
      <Button onClick={e => this.goToAdd(e)}>Add</Button>
    )

    const mainPage = (
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign='left'>
              {search}
            </Grid.Column>
            <Grid.Column textAlign='left'>
              {addButton}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        { table(this.props.fieldsList,this.props.valuesList,this.goToEdit) }
      </Container>
    )

    const editRecord = (
      <Container>
        <Grid style={{ width: 400 }} textAlign='left' float='left'>
          {popupFields}
          {popupButtons}
        </Grid>
      </Container>
    )

    var pages = new Array();
    pages[LABELS.MAIN_PAGE] = mainPage;
    pages[LABELS.EDIT] = editRecord;
    pages[LABELS.NEW] = editRecord;

    return (
      <Container>
        <Header textAlign='center'>{this.props.title}</Header>
        <SubTitle
          pages={this.state.pages}
          action={this.backTo}
        />
        <br/>
        { pages[this.getPage()] }
      </Container>
    );
  }
}

export default BaseRecord;
