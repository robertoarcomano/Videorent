import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { shallow } from 'enzyme';

xdescribe('Rendering tests: ', () => {
  var wrapper;
  const checkPattern = (<span> Results: pong</span>)
  beforeEach( () => {
    wrapper = shallow(<App />);
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });

  it('Button existence: ', () => {
    expect(
      wrapper.find('button').length
    ).toBe(1);
  });

  it('setState to DOM sync test: ', () => {
    wrapper.setState({ response: 'pong'});
    wrapper.update();
    expect(
      wrapper.contains(checkPattern)
    ).toBe(true)
  })

  it('setState to DOM async test: ', () => {
    wrapper.setState({ response: 'pong'}, () => {
      wrapper.update();
      expect(
        wrapper.contains(checkPattern)
      ).toBe(true)
    });
  })

  it('API connection working: ', (done) => {
    fetch.once(JSON.stringify({"response":"pong"}));
    wrapper.find('button').simulate('click')
    setImmediate( () => {
      wrapper.update();
      if (!wrapper.contains(checkPattern))
        done(fail("pong not exists"))
      done();
    })
  });
});

xdescribe('new tests', () => {
  it('first new', () => {
    expect(true).toBe(true)
  })
})
