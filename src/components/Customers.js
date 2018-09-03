import React, { Component } from 'react';
import store from '../store/index';
import { connect } from 'react-redux';
import { Search, Header, Table, HeaderCell, Row, Cell, Label, Button, Grid, Column, Container, Menu, Divider, Segment, Image } from 'semantic-ui-react'
// Form, Field, Group, Input, Select, Label, Radio, TextArea, Checkbox, Button
import * as LABELS from '../constants/labels';
import BaseRecord from './BaseRecord'

export class CustomersTemp extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(e, { value }) {
    this.props.SetFilterCustomer(value)
  }

  render() {
    const showValues = this.props.customers.filter( item => item.indexOf(this.props.filters.customer) != -1);
    return (
      <BaseRecord
        title={LABELS.CUSTOMERS}
        searchHandler={this.search}
        searchValue={this.props.filters.customer}
        newHandler={this.props.AddCustomer}
        fieldsList="Name"
        valuesList={showValues}
      />
    );
  }
}

const mapStateToProps = state => {
  return { customers: state.customers, filters: state.filters };
}

const AddCustomer = (name) => ({ type: "ADD_CUSTOMER", payload: name });
const SetFilterCustomer = (name) => ({ type: "SET_FILTER_CUSTOMER", payload: name });

const mapDispatchToProps = dispatch => {
  return {
    AddCustomer: (name) => dispatch(AddCustomer(name)),
    SetFilterCustomer: (name) => dispatch(SetFilterCustomer(name))
  };
}

const Customers = connect(mapStateToProps,mapDispatchToProps)(CustomersTemp);

export default Customers;
