import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Menu } from 'semantic-ui-react'

class MenuVideo extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e) {
    alert("ok")
  }

  render() {
    return (
      <Menu horizontal>
        <Menu.Item
          name='Articles'
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Customers'
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Rentals'
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }

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
}

export default MenuVideo;
