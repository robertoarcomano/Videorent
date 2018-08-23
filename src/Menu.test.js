import React from 'react';
import ReactDOM from 'react-dom';
import MenuVideo from './MenuVideo';
import { shallow } from 'enzyme';
import { Dropdown, Menu } from 'semantic-ui-react'

describe('Menu tests: ', () => {
  const menuItems = [ 'Articles', 'Customers', 'Rentals'];
  var wrapperMenuItems;
  beforeEach( () => {
    wrapperMenuItems = shallow(<MenuVideo />).find("Menu").children();
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
      var itemName = item.props().name;
      if (itemName == undefined)
        fail("Undefined")
      if (itemName != menuItems[index])
        fail("Wrong name. Expected: '" + menuItems[index] + "', Got: '" + itemName + "'")
    })
  })

});
