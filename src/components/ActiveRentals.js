import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import { Search, Header, Grid, Container, Button, Modal } from 'semantic-ui-react'
import { table } from './table'

export class RentalsTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    }
    this.search = this.search.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  search(e, { value }) {
    console.log(value)
    this.setState({
      searchValue: value
    })
  }

  onClick(obj) {
    alert(JSON.stringify(obj))
  }

  render() {
    const page = (label, searchValue, onSearch, fieldsList, valuesList, onClick, onAdd) => (
      <Container>
        <Grid.Row>
          <Grid.Column width={1}>
            {label}
          </Grid.Column>
          <Grid.Column width={1}>
            {searchValue !== null ?
              <Container>
                <br/>
                <Search
                  loading={false}
                  onSearchChange={ onSearch }
                  value={ searchValue }
                  open={ false }
                />
              </Container>
              :""
            }
          </Grid.Column>
        </Grid.Row>
        { table(
            fieldsList,
            valuesList,
            onClick
          )
        }
        { onAdd !== null ? <Button onClick={onAdd}>Add</Button>:"" }
        <Grid.Row>
          <Grid.Column textAlign='center'>
          <Modal size="mini" open={this.state.isPopupOpen}>
            <Modal.Header>Return {this.state.articleSelected}?</Modal.Header>
            <Modal.Actions>
              <Button negative onClick={this.backToMainPage}>No</Button>
              <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.okReturn} />
            </Modal.Actions>
          </Modal>
          </Grid.Column>
        </Grid.Row>
      </Container>
    )
    let label, searchValue, onSearch, fieldsList, valuesList, onClick, onAdd;
    label = null;
    searchValue = this.state.searchValue;
    onSearch = this.search;
    valuesList = [];
    this.props.rentals.forEach( rental =>
      rental.articles.forEach( article => {
        if  (
          (rental.customer.toUpperCase().indexOf(this.state.searchValue.toUpperCase()) !== -1) ||
          (article.name.toUpperCase().indexOf(this.state.searchValue.toUpperCase()) !== -1)
        )
          valuesList.push({
            n: valuesList.length+1,
            customer: rental.customer,
            article: article.name,
            date: article.date
          })
        }
      )
    )
    fieldsList = valuesList.length === 0 ? [] : Object.keys(valuesList[0])
    onClick = this.onClick;
    onAdd = null;

    return (
      <Container>
        <Header>{LABELS.ACTIVE_RENTALS}</Header>
        <br/>
        { page(label, searchValue, onSearch, fieldsList, valuesList, onClick,onAdd) }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals
  };
}

const Rentals = connect(mapStateToProps)(RentalsTemp);

export default Rentals;
