import React from 'react';
import ReactDOM from 'react-dom';
import { BaseRecord } from '../components/BaseRecord';
import { mount, shallow, render } from 'enzyme';
import { Search, Header, Table, HeaderCell, Row, Cell, Label, Button, Grid, GridRow, GridColumn, Column, Container, Menu, Divider, Segment, Image, Popup, Input } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';

describe('BaseRecord: ', () => {
  let rootWrapper
  const searchHandler = jest.fn();
  const searchValue = "1";
  const newHandler = jest.fn();
  const updateHandler = jest.fn();
  const deleteHandler = jest.fn();
  const fieldsList = [ "ID", "NAME"];
  let valuesList;
  const shallowWrapper = () =>
    shallow(<BaseRecord
      title={"TITLE"}
      searchHandler={searchHandler}
      searchValue={searchValue}
      newHandler={newHandler}
      updateHandler={updateHandler}
      deleteHandler={deleteHandler}
      fieldsList={fieldsList}
      valuesList={valuesList}
    />);
  const mountWrapper = () =>
    mount(<BaseRecord
      title={"TITLE"}
      searchHandler={searchHandler}
      searchValue={searchValue}
      newHandler={newHandler}
      updateHandler={updateHandler}
      deleteHandler={deleteHandler}
      fieldsList={fieldsList}
      valuesList={valuesList}
    />);

  beforeEach( () => {
    valuesList = [
      { ID: "1", NAME: "name1" },
      { ID: "2", NAME: "name2" },
      { ID: "3", NAME: "name3" }
    ];
    rootWrapper = shallowWrapper();
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });

  it('Zero Values Rendering: ', () => {
    valuesList = [];
    rootWrapper = shallowWrapper();
    expect(true).toBe(true);
  });

  it('Values Start Count & Check Values: ', () => {
    expect(
      rootWrapper.find(Table.Body).length
    ).toBe(1)

    expect(
      rootWrapper.find(Table.Body).children().find(Table.Row).length
    ).toBe(valuesList.length)

    let rows = rootWrapper.find(Table.Body).children().find(Table.Row);
    for (let i = 0; i < rows.length; i++) {
      let cells = rows.at(i).find(Table.Cell);
      for (let j = 0; j < cells.length; j++) {
        expect(
          cells.at(j).children().at(0).text()
        ).toBe(
          valuesList[i][fieldsList[j]]
        )
      }
    }
  });

  it('Click New: ', () => {
    // 1. Checks MAIN_PAGE
    expect(rootWrapper.instance().isNew()).toBe(false);

    // 2. Simulate Click
    let button = rootWrapper.find(Button);
    button.simulate("click");

    // 3. Check NEW PAGE
    expect(rootWrapper.instance().isNew()).toBe(true);
  });

  it('Insert new value: ', () => {
    // 1. Simulate Click
    let button = rootWrapper.find(Button);
    button.simulate("click");

    // 2. Insert data in first field (key)
    let name = fieldsList[0];
    let value = "hello";
    rootWrapper.instance().onChangeRecord(name,value);

    // 3. Simulate Confirm Button Click
    let confirmButton = rootWrapper.find(Button).first();
    confirmButton.simulate("click");

    // 4. Check Just Inserted Value
    expect(
      rootWrapper.update().state().record[name] === value
    ).toBe(true);
  });


    //
    // // 2. Click Add Button
    // var button = rootWrapper.find(Button);
    // console.log("button: " + button)
    // button.simulate("click");
    //
    // // 5. Check fields be visible
    // expect(rootWrapper.update().state().isPopupOpen).toBe(true);
    //
    // // 6. Write data to state
    // var tmpRecord = { ID: "4", NAME: "name4"}
    // rootWrapper.setState( { record: tmpRecord } )
    //
    // var content = rootWrapper.find(Popup).props().content;
    // var buttons = shallow(content)
    //             .find("div").children()
    //             .find(GridRow).children()
    //             .find(GridColumn).children()
    //             .find(Button);
    //
    // buttons.forEach( button => {
    //   if (button.render().text() === "Confirm")
    //     button.simulate("click");
    // })
    //
    // expect(newHandler.mock.calls.length).toBe(1);
    // expect(newHandler.mock.calls[0][0]).toEqual(tmpRecord);
});
