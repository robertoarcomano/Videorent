import React from 'react';
import ReactDOM from 'react-dom';
import { BaseRecord } from '../components/BaseRecord';
import { mount, shallow, render } from 'enzyme';
import { Search, Header, Table, HeaderCell, Row, Cell, Label, Button, Grid, GridRow, GridColumn, Column, Container, Menu, Divider, Segment, Image, Popup, Input } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';
import { RentalsTemp as Rentals } from '../components/Rentals'

describe('Rentals: ', () => {
  let rootWrapper;
  const shallowWrapper = () =>
    shallow(<Rentals/>);
  const mountWrapper = () =>
    mount(<Rentals/>);

  beforeEach( () => {
    rootWrapper = shallowWrapper();
  })

  it('Rendering only', () => {
    expect(true).toBe(true)
  })

  it('State.page existence', () => {
    expect(rootWrapper.state().page !== undefined).toBe(true)
  })

  it('Customer Search existence', () => {
    expect(rootWrapper.find(Search).length !== 0).toBe(true)
  })

  it('Customer Table existence', () => {
    expect(rootWrapper.find(Table).length !== 0).toBe(true)
  })
});
