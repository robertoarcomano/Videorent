import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import Articles from './Articles';
import Customers from './Customers';
import Rentals from './Rentals';
import ActiveRentals from './ActiveRentals';
import { Container } from 'semantic-ui-react'

class MainTemp extends Component {
  render() {
    var getChild;
    switch (this.props.active) {
    case LABELS.ARTICLES:
      getChild = (<Articles/>);
      break;
    case LABELS.CUSTOMERS:
      getChild = (<Customers/>);
      break;
    case LABELS.RENTALS:
      getChild = (<Rentals/>);
      break;
    case LABELS.ACTIVE_RENTALS:
      getChild = (<ActiveRentals/>);
      break;
    default:
      getChild = (<p>{this.props.active}</p>);
    }
    return (
      <Container>
        {getChild}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { active: state.active };
}

// const ActivateArticles = () => ({ type: "ACTIVATE_ARTICLES", payload: "" });
//
// const mapDispatchToProps = dispatch => {
//   return {
//     ActivateArticles: () => dispatch(ActivateArticles())
//   };
// }

const Main = connect(mapStateToProps,null)(MainTemp);

export default Main;
