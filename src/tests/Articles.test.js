import React from 'react';
import ReactDOM from 'react-dom';
import { ArticlesTemp as Articles } from '../components/Articles';
import { mount, shallow, render } from 'enzyme';
import { Dropdown, Menu } from 'semantic-ui-react'
import * as LABELS from '../constants/labels';

describe('Articles: ', () => {
  let rootWrapper
  const AddArticle = jest.fn();
  const SetFilterArticle = jest.fn();
  let articles,filters;
  const shallowWrapper = () =>
    shallow(<Articles
      AddArticle={AddArticle}
      SetFilterArticle={SetFilterArticle}
      articles={articles}
      filters={filters}
    />);
  const mountWrapper = () =>
    mount(<Articles
      AddArticle={AddArticle}
      SetFilterArticle={SetFilterArticle}
      articles={articles}
      filters={filters}
    />);

  beforeEach( () => {
    articles = ["1","2"];
    filters = { article: "" }
    rootWrapper = shallowWrapper();
  })

  it('Generic Rendering: ', () => {
    expect(true).toBe(true);
  });

  it('Zero Articles Rendering: ', () => {
    articles = [];
    rootWrapper = shallowWrapper();
    expect(true).toBe(true);
  });

  it('Articles Start Count: ', () => {
    rootWrapper = mountWrapper();
    expect(
      rootWrapper.find("tbody").children().find("td").length
    ).toBe(2)
  });

  it('Articles Start List: ', () => {
    rootWrapper.find("TableCell").forEach( (item, index) => {
      if (item.render().text() != articles[index])
        fail("Articles List Mismatch. Expected: " + articles[index] + " Got: " + item.render().text())
    })
  });

  it('Add Article: ', () => {
    // 1. Use mount
    rootWrapper = mountWrapper();
    // 2. Checks call to AddArticle be 0
    expect(AddArticle.mock.calls.length).toBe(0);
    // 3.1. Write indirectly new article input field to "3"
    rootWrapper.setProps( { filters: { article: "3" } } ).update();
    // 3.2. Click Add Button
    rootWrapper.find("Button").at(0).simulate("click");
    // 4. Checks call to AddArticle be 1
    expect(AddArticle.mock.calls.length).toBe(1);
    rootWrapper.update();
    // 5. Read articles, manually add "3" article and set props
    let tmpArticles = rootWrapper.prop("articles");
    tmpArticles.push("3");
    rootWrapper.setProps( { articles: tmpArticles } ).update();
    // 6. Reset new article input field to ""
    rootWrapper.setProps( { filters: { article: "" } } ).update();
    // 7. Check Articles count
    expect(rootWrapper.find("h5").text()).toBe("Count: 3")
  });
});
