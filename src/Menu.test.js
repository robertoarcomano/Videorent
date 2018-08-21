import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import { shallow } from 'enzyme';

describe('Rendering tests: ', () => {
  var wrapper;
  beforeEach( () => {
    wrapper = shallow(<Menu />);
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });
});
