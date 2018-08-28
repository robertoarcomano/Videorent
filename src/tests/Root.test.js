import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../components/Root';
import { mount } from 'enzyme';
import { Dropdown, Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';
// import configureStore from 'redux-mock-store'
import store from '../store/index';
import { Provider } from "react-redux";

describe('Root tests: ', () => {
  var rootWrapper;
  beforeEach( () => {
    rootWrapper = mount(
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  })

  it('Click Articles MenuItem: ', (done) => {
    let articleFound = false;
    rootWrapper.find(".item").forEach( (item,index) => {
      var itemName = item.text();
      if (itemName == "Articles") {
        articleFound = true;
        item.simulate("click")
        setImmediate( () => {
          if (rootWrapper.find("#main").find("p").text() != LABELS.ARTICLES)
            fail("Expected: " + LABELS.ARTICLES + " Got: " + rootWrapper.find("p").text())
          done()
        })
      }
    })
    if (!articleFound)
      fail("Articles menuItem not found");
  })
});
