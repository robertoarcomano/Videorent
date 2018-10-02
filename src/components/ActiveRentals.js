import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import { Search, Header, Grid, Container } from 'semantic-ui-react'
import { table } from './table'
import { searchNoCase } from '../constants/utils'

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
    this.setState({
      searchValue: value
    })
  }

  onClick(obj) {
    alert(JSON.stringify(obj))
  }

  render() {
    const page = (searchValue, onSearch, fieldsList, valuesList, onClick) => (
      <Container>
        <Grid.Row>
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
      </Container>
    )
    const searchValue = this.state.searchValue;
    const onSearch = this.search;

    const valuesList = this.props.rentals
      .map( rental => rental.articles
          .filter(article =>
            searchNoCase(article.name,this.state.searchValue) ||
            searchNoCase(rental.customer,this.state.searchValue)
          )
          .map( article => ({
            customer: rental.customer,
            article: article.name,
            date: article.date
          }))
      )
      .reduce( (x,y) => x.concat(y) )
      .map( (rental,index) => ({
        n: index + 1,
        customer: rental.customer,
        article: rental.article,
        date: rental.date
      }))
    const fieldsList = valuesList.length === 0 ? [] : Object.keys(valuesList[0])
    const onClick = this.onClick;

    return (
      <Container>
        <Header>{LABELS.ACTIVE_RENTALS}</Header>
        <br/>
        { page(searchValue, onSearch, fieldsList, valuesList, onClick) }
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
