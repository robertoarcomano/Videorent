import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import BaseRecord from './BaseRecord'
import { searchNoCase } from '../constants/utils.js'

export class CustomersTemp extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.fieldList = ["name","cell"];
  }

  search(e, { value }) {
    this.props.SetFilterCustomer(value)
  }

  render() {
    const valuesList = this.props.customers.filter( item => searchNoCase(item.name,this.props.filters.customer) );
    return (
      <BaseRecord
        title={LABELS.CUSTOMERS}
        searchHandler={this.search}
        searchValue={this.props.filters.customer}
        newHandler={this.props.AddCustomer}
        updateHandler={this.props.UpdateCustomer}
        deleteHandler={this.props.DeleteCustomer}
        fieldsList={this.fieldList}
        valuesList={valuesList}
      />
    );
  }
}

const mapStateToProps = state => {
  return { customers: state.customers, filters: state.filters };
}

const AddCustomer = (customer) => ({ type: "ADD_CUSTOMER", payload: customer });
const UpdateCustomer = (customer) => ({ type: "UPDATE_CUSTOMER", payload: customer });
const DeleteCustomer = (customer) => ({ type: "DELETE_CUSTOMER", payload: customer });
const SetFilterCustomer = (name) => ({ type: "SET_FILTER_CUSTOMER", payload: name });

const mapDispatchToProps = dispatch => {
  return {
    AddCustomer: (customer) => dispatch(AddCustomer(customer)),
    UpdateCustomer: (customer) => dispatch(UpdateCustomer(customer)),
    DeleteCustomer: (customer) => dispatch(DeleteCustomer(customer)),
    SetFilterCustomer: (name) => dispatch(SetFilterCustomer(name))
  };
}

const Customers = connect(mapStateToProps,mapDispatchToProps)(CustomersTemp);

export default Customers;
