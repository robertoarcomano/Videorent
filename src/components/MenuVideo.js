import React, { Component } from 'react';
import { Menu, Icon, Container, Header } from 'semantic-ui-react'
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
    const jenkinsUrl = "https://jenkins.io/";
    return (
      <Container>
      <Menu compact>
        {menuItems}
        <Menu.Menu>
          <Menu.Item key="Videorent">
            <Header>Videorent - v2018.2</Header>
          </Menu.Item>
          <Menu.Item
            name="Github"
            key="Github"
            onClick={ () => window.open(gitHubUrl) }>
            <Icon size='big' name='github' />
            Source on Github
          </Menu.Item>
          <Menu.Item
            name="Jenkins"
            key="Jenkins"
            onClick={ () => window.open(jenkinsUrl) }>
            <Icon size='big' name='jenkins' />
            Build/Deploy with Jenkins
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </Container>
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
