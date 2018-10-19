import React from 'react';
import ReactDOM from 'react-dom';
import { MenuVideoTemp as MenuVideo } from '../components/MenuVideo';
import { mount, shallow } from 'enzyme';
import { Dropdown, Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';

describe('Menu tests: ', () => {
  let rootWrapper, menus, menuItems
  const getMenus = () => rootWrapper.find(Menu);
  const getMenuItems = () => getMenus().find(Menu.Item);
  const setMenuItemActive = (label) => rootWrapper.setProps({ active: label})
  const Activate = jest.fn();

  beforeEach( () => {
    rootWrapper = shallow(<MenuVideo Activate={Activate}/>);
    menus = getMenus();
    menuItems = getMenuItems();
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });

  it('Count Menu: ', () => {
    expect(
      menus.length === 1
    ).toBe(true)
  })

  it('All Menu Entry In Order: ', () => {
    menuItems.forEach( (item,index) => {
      const itemName = item.props().name;
      if (
          (index < LABELS.MENU.length) &&
          (itemName != LABELS.MENU[index])
        )
          fail("Wrong name. Expected: '" + LABELS.MENU[index] + "', Got: '" + itemName + "'")
    })
  })

  it('Activation Menu Items: ', () => {
    const getMenuItemByLabel = label => getMenuItems().filterWhere( item => item.props().name === label);
    LABELS.MENU.forEach( LABEL => {
      Activate.mockClear();
      let menuItem = getMenuItemByLabel(LABEL)

      if (menuItem.hasClass("active"))
        fail("Menu Item " + LABEL + " appears already active")

      if (Activate.mock.calls.length != 0)
        fail("Activate already called!")

      menuItem.simulate('click');

      if (Activate.mock.calls.length == 0)
        fail("Activate not called!")

      if (Activate.mock.calls[0] != LABEL)
        fail("Activate called with wrong params. Excepted: " + LABEL + " Got: " + Activate.mock.calls[0])

    })
  })

});
