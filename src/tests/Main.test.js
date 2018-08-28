import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/Main';
import { mount } from 'enzyme';
import { Dropdown, Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';
import configureStore from 'redux-mock-store'

xdescribe('Main tests: ', () => {
  const initialState = { active:"" }
  const mockStore = configureStore()
  let store,wrapperMenuItems

  beforeEach( () => {
    store = mockStore(initialState)
    wrapperMenuItems = mount(<MenuVideo store={store} /> ).find("Menu").children().find(".item");
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });

  it('Count Menu Items: ', () => {
    expect(
      wrapperMenuItems.length
    ).toBe(menuItems.length)
  })

  it('All Menu entry: ', () => {
    wrapperMenuItems.forEach( (item,index) => {
      var itemName = item.text();
      if (itemName == undefined)
        fail("Undefined")
      if (itemName != menuItems[index])
        fail("Wrong name. Expected: '" + menuItems[index] + "', Got: '" + itemName + "'")
    })
  })
});
