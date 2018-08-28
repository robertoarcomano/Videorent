import React, { Component } from 'react';
import store from '../store/index';
import '../css/App.css';
import { connect } from 'react-redux';

class MainTemp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <p>{this.props.active}</p>
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
