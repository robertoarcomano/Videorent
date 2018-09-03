import React from 'react';
import ReactDOM from 'react-dom';
import { CustomersTemp as Customers } from '../components/Customers';
import { mount, shallow, render } from 'enzyme';
import { Dropdown, Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';

describe('Customers: ', () => {
  let rootWrapper
  const AddCustomer = jest.fn();
  const SetFilterCustomer = jest.fn();
  let customers,filters;
  const shallowWrapper = () =>
    shallow(<Customers
      AddCustomer={AddCustomer}
      SetFilterCustomer={SetFilterCustomer}
      customers={customers}
      filters={filters}
    />);
  const mountWrapper = () =>
    mount(<Customers
      AddCustomer={AddCustomer}
      SetFilterCustomer={SetFilterCustomer}
      customers={customers}
      filters={filters}
    />);

  beforeEach( () => {
    customers = ["1","2"];
    filters = { customer: "" }
    rootWrapper = shallowWrapper();
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });

  it('Zero Customers Rendering: ', () => {
    customers = [];
    rootWrapper = shallowWrapper();
    expect(true).toBe(true);
  });

  it('Customers Start Count: ', () => {
    rootWrapper = mountWrapper();
    expect(
      rootWrapper.find("tbody").children().find("td").length
    ).toBe(2)
  });

  it('Customers Start List: ', () => {
    rootWrapper.find("TableCell").forEach( (item, index) => {
      if (item.render().text() != customers[index])
        fail("Customers List Mismatch. Expected: " + customers[index] + " Got: " + item.render().text())
    })
  });

  it('Add Customer: ', () => {
    // 1. Use mount
    rootWrapper = mountWrapper();
    // 2. Checks call to AddCustomer be 0
    expect(AddCustomer.mock.calls.length).toBe(0);
    // 3.1. Write indirectly new customer input field to "3"
    rootWrapper.setProps( { filters: { customer: "3" } } ).update();
    // 3.2. Click Add Button
    rootWrapper.find("Button").at(0).simulate("click");
    // 4. Checks call to AddCustomer be 1
    expect(AddCustomer.mock.calls.length).toBe(1);
    rootWrapper.update();
    // 5. Read customers, manually add "3" customer and set props
    let tmpCustomers = rootWrapper.prop("customers");
    tmpCustomers.push("3");
    rootWrapper.setProps( { customers: tmpCustomers } ).update();
    // 6. Reset new customer input field to ""
    rootWrapper.setProps( { filters: { customer: "" } } ).update();
    // 7. Check Customers count
    expect(rootWrapper.find("h5").text()).toBe("Count: 3")
  });
});
