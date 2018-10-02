import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';
import { connect } from 'react-redux';

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
    const gitHubUrl = "https://github.com/robertoarcomano/Videorent";
    return (
      <Menu compact >
        {menuItems}
        <Menu.Item
          name="Github"
          key="Github"
          onClick={ () => window.open(gitHubUrl) }>
          <Icon name='github' />
          Source on Github  
        </Menu.Item>
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
