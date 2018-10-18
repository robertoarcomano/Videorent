import React from 'react';
import ReactDOM from 'react-dom';
import { MenuVideoTemp as MenuVideo } from '../components/MenuVideo';
import { mount } from 'enzyme';
import { Dropdown, Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';

xdescribe('Menu tests: ', () => {
  let rootWrapper,menuItems
  const getMenuItems = () => rootWrapper.update().find("Menu").children().find(".item");
  const setMenuItemActive = (label) => rootWrapper.setProps({ active: label})
  const Activate = jest.fn();

  beforeEach( () => {
    rootWrapper = mount(<MenuVideo Activate={Activate}/>);
    menuItems = getMenuItems()
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });

  it('Count Menu Items: ', () => {
    expect(
      menuItems.length
    ).toBe(LABELS.MENU.length)
  })

  it('All Menu Entry In Order: ', () => {
    menuItems.forEach( (item,index) => {
      const itemName = item.text();
      if (itemName == undefined)
        fail("Undefined")
      if (itemName != LABELS.MENU[index])
        fail("Wrong name. Expected: '" + LABELS.MENU[index] + "', Got: '" + itemName + "'")
    })
  })

  it('Activation Menu Items: ', () => {
    const getMenuItemByLabel = label => getMenuItems().filterWhere( item => item.text() == label);
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

      setMenuItemActive(LABEL);

      if (!getMenuItemByLabel(LABEL).hasClass("active"))
        fail("Menu Item " + LABEL + " not actived")
    })
  })

});
