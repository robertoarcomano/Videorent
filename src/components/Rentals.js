import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import { Search, Header, Label, Grid, Container, Button, Icon, Modal } from 'semantic-ui-react'
import { table } from './table'
import { now, calcDelay } from '../constants/utils.js'

export class RentalsTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: LABELS.SELECT_CUSTOMER,
      isPopupOpen: false,
      articleSelected: ""
    }
    this.searchCustomers = this.searchCustomers.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.selectRental = this.selectRental.bind(this);
    this.okReturn = this.okReturn.bind(this);
    this.backToMainPage = this.backToMainPage.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.searchArticles = this.searchArticles.bind(this);
    this.selectArticle = this.selectArticle.bind(this);
    this.cost = this.cost.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      page: LABELS.SELECT_CUSTOMER,
      isPopupOpen: false,
      articleSelected: ""
    })
  }

  searchCustomers(e, { value }) {

    this.props.SetFilterCustomer(value)
  }

  selectCustomer(record) {
    this.props.SetCustomer(record)
    this.setState({ page: LABELS.MAIN_PAGE })
  }

  selectRental(record) {
    this.setState({
      isPopupOpen: true,
      articleSelected: record
    })
  }

  backToMainPage() {
    this.setState({
      page: LABELS.MAIN_PAGE,
      isPopupOpen: false,
      articleSelected: ""
    })
  }

  okReturn() {
    this.props.ReturnArticle(this.state.articleSelected.name)
    this.backToMainPage();
  }

  addArticle() {
    this.setState({ page: LABELS.ADD_ARTICLE })
  }

  searchArticles(e, { value }) {
    this.props.SetFilterArticle(value)
  }

  selectArticle(record) {
    this.props.RentArticle(record.name)
    this.backToMainPage();
  }

  cost() {
    let cost = this.props.articles.filter( article => article.name === this.state.articleSelected.name)
    if (cost.length > 0) {
      return cost[0].price
    }
    return 0
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
            <Modal.Header>Return {this.state.articleSelected.name}?</Modal.Header>
            <Modal.Content>
              "{this.props.customer.name}" has to pay  x   {this.cost()} x {calcDelay(this.state.articleSelected.date,now())} = {calcDelay(this.state.articleSelected.date,now())*this.cost()}
            </Modal.Content>
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
    switch (this.state.page) {
    case LABELS.SELECT_CUSTOMER:
      label = null;
      searchValue = this.props.filters.customer;
      onSearch = this.searchCustomers;
      valuesList = this.props.customers.filter( item => item.name.indexOf(this.props.filters.customer) !== -1)
      fieldsList = valuesList.length === 0 ? [] : Object.keys(valuesList[0])
      onClick = this.selectCustomer;
      onAdd = null;
      break;

    case LABELS.MAIN_PAGE:
      label = (
        <Container>
          <Icon name="user"/><Label> {this.props.customer.name} {this.props.customer.cell}</Label>
        </Container>
      );
      searchValue = null;
      onSearch = null;
      valuesList = this.props.rentals.filter( item => item.customer === this.props.customer.name );
      if (valuesList.length === 0)
        valuesList = [];
      else
        valuesList = valuesList[0].articles;
      fieldsList = valuesList.length === 0 ? [] : Object.keys(valuesList[0])
      onClick = this.selectRental;
      onAdd = this.addArticle;
      break;
    case LABELS.ADD_ARTICLE:
      label = (
        <Container>
          <Icon name="user"/><Label> {this.props.customer.name} {this.props.customer.cell}</Label>
        </Container>
      );
      searchValue = this.props.filters.article;
      onSearch = this.searchArticles;
      valuesList = this.props.articles.filter( item => item.name.indexOf(this.props.filters.article) !== -1)
      fieldsList = valuesList.length === 0 ? [] : Object.keys(valuesList[0])
      onClick = this.selectArticle;
      onAdd = null;
      break;
    default:
      break;
    }

    return (
      <Container>
        <Header>{<Button onClick={this.reset}>{LABELS.RENTALS}</Button>}{" -> " + this.state.page}</Header>
        <br/>
        { page(label, searchValue, onSearch, fieldsList, valuesList, onClick,onAdd) }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters,
    articles: state.articles,
    rentals: state.rentals,
    customers: state.customers,
    customer: state.customer
  };
}

const searchCustomer = (name) => ({ type: "SEARCH_CUSTOMER", payload: name });
const SetFilterCustomer = (name) => ({ type: "SET_FILTER_CUSTOMER", payload: name });
const SetCustomer = (record) => ({ type: "SET_CUSTOMER", payload: record });
const ReturnArticle = (name) => ({ type: "RETURN_ARTICLE", payload: name });
const SetFilterArticle = (name) => ({ type: "SET_FILTER_ARTICLE", payload: name });
const RentArticle = (name) => ({ type: "RENT_ARTICLE", payload: name });

const mapDispatchToProps = dispatch => {
  return {
    searchCustomer: (name) => dispatch(searchCustomer(name)),
    SetFilterCustomer: (name) => dispatch(SetFilterCustomer(name)),
    SetCustomer: (record) => dispatch(SetCustomer(record)),
    ReturnArticle: (name) => dispatch(ReturnArticle(name)),
    SetFilterArticle: (name) => dispatch(SetFilterArticle(name)),
    RentArticle: (name) => dispatch(RentArticle(name))
  };
}

const Rentals = connect(mapStateToProps,mapDispatchToProps)(RentalsTemp);

export default Rentals;
