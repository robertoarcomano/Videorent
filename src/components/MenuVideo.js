import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

export class MenuVideoTemp extends Component {
  render() {
    const menuItems = LABELS.MENU.map( label =>
      <Menu.Item
        name={label}
        key={label}
        onClick={ () => this.props.Activate(label) }
        active={this.props.active === label}
      />
    )
    return (
      <Menu horizontal="true">
        {menuItems}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return { active: state.active };
}

const Activate = (value) => ({ type: "ACTIVATE", payload: value });

const mapDispatchToProps = dispatch => {
  return {
    Activate: (value) => dispatch(Activate(value))
  };
}

const MenuVideo = connect(mapStateToProps,mapDispatchToProps)(MenuVideoTemp);

export default MenuVideo;
