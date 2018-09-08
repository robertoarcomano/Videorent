import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import { Search, Header, Table, Label, Button, Grid, Container, Divider, Popup, Input } from 'semantic-ui-react'
import { capitalize } from '../constants/utils.js'
import { table } from './table'

export class RentalsTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: LABELS.SELECT_CUSTOMER
    }
    this.searchCustomer = this.searchCustomer.bind(this);
    this.searchCustomer = this.searchCustomer.bind(this);
  }

  searchCustomer(e, { value }) {
    console.log("search: " + value)
    console.log("filter: " + this.props.filters.article)
    this.props.SetFilterArticle(value)
  }

  selectCustomer(record) {
    alert(record)
  }

  render() {
    const showFields = ["id", "name"].map( label =>
      <Table.HeaderCell key={label}>{capitalize(label)}</Table.HeaderCell>
    );

    return (
      <Container>
        <Header>{LABELS.RENTALS}</Header>
        <Search
          loading={false}
          onSearchChange={this.props.searchCustomer}
          value={this.props.searchValue}
          open={false}
        />
        { table(
            ["id", "name"],
            [ {id: 1, name: "name1"},{id: 2, name: "name2"}],
            this.selectCustomer
          )
        }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { filters: state.filters };
}

const searchCustomer = (name) => ({ type: "SEARCH_CUSTOMER", payload: name });

const mapDispatchToProps = dispatch => {
  return {
    searchCustomer: (name) => dispatch(searchCustomer(name))
  };
}

const Rentals = connect(mapStateToProps,mapDispatchToProps)(RentalsTemp);

export default Rentals;
