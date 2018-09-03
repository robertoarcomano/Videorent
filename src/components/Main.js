import React, { Component } from 'react';
import store from '../store/index';
import '../css/App.css';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import Articles from './Articles';
import Customers from './Customers';

class MainTemp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var getChild;
    switch (this.props.active) {
    case LABELS.ARTICLES:
      getChild = (<Articles/>);
      break;
    case LABELS.CUSTOMERS:
      getChild = (<Customers/>);
      break;
    default:
      getChild = (<p>{this.props.active}</p>);
    }
    return (
      <div className="App">
        {getChild}
      </div>
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
