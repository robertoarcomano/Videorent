import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';
import App from './App';
import { connect } from 'react-redux';

export class MenuVideoTemp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menuItems = LABELS.MENU.map( label =>
      <Menu.Item
        name={label}
        key={label}
        onClick={ () => this.props.Activate(label) }
        active={this.props.active == label}
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

  // state = { activeItem: 'account' }
  //
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  // constructor(props) {
  //   super(props);
  // }
  //
  // render() {
  //   const { activeItem } = this.state
  //   return (
  //     <Menu secondary vertical>
  //       <Menu.Item
  //         name='account'
  //         active={activeItem === 'account'}
  //         onClick={this.handleItemClick}
  //       />
  //       <Menu.Item
  //         name='settings'
  //         active={activeItem === 'settings'}
  //         onClick={this.handleItemClick}
  //       />
  //       <Dropdown item text='Display Options'>
  //         <Dropdown.Menu>
  //           <Dropdown.Header>Text Size</Dropdown.Header>
  //           <Dropdown.Item>Small</Dropdown.Item>
  //           <Dropdown.Item>Medium</Dropdown.Item>
  //           <Dropdown.Item>Large</Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     </Menu>
  //   )
  // }
