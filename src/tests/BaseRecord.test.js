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

  it('New Value: ', () => {
    // 1. Use mount
    // rootWrapper = mountWrapper();

    // 2. Checks call to AddArticle be 0
    expect(newHandler.mock.calls.length).toBe(0);

    // 3. Check popup be not visible
    expect(rootWrapper.update().state().isPopupOpen).toBe(false);

    // 4. Click Add Button
    var trigger = rootWrapper.find(Popup).props().trigger;
    var button = shallow(trigger).find("button");
    button.simulate("click");

    // 5. Check popup be visible
    expect(rootWrapper.update().state().isPopupOpen).toBe(true);

    // 6. Write data to state
    var tmpRecord = { ID: "4", NAME: "name4"}
    rootWrapper.setState( { record: tmpRecord } )

    var content = rootWrapper.find(Popup).props().content;
    var buttons = shallow(content)
                .find("div").children()
                .find(GridRow).children()
                .find(GridColumn).children()
                .find(Button);

    buttons.forEach( button => {
      if (button.render().text() === "Confirm")
        button.simulate("click");
    })

    expect(newHandler.mock.calls.length).toBe(1);
    expect(newHandler.mock.calls[0][0]).toEqual(tmpRecord);
  });
});
