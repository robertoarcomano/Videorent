import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import BaseRecord from './BaseRecord'
import { table } from './table'
import { Container } from 'semantic-ui-react'

export class ArticlesTemp extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.fieldList = ["name","type","year","category","price"];
  }

  search(e, { value }) {
    console.log("search: " + value)
    console.log("filter: " + this.props.filters.article)
    this.props.SetFilterArticle(value)
  }

  render() {
    const valuesList = this.props.articles.filter( item => item.name.indexOf(this.props.filters.article) !== -1)
    return (
      <p>
        { table(this.fieldList,valuesList,null) }
      </p>
    )
  }
}

const mapStateToProps = state => {
  return { articles: state.articles, filters: state.filters };
}

const AddArticle = (article) => ({ type: "ADD_ARTICLE", payload: article });
const UpdateArticle = (article) => ({ type: "UPDATE_ARTICLE", payload: article });
const DeleteArticle = (article) => ({ type: "DELETE_ARTICLE", payload: article });
const SetFilterArticle = (name) => ({ type: "SET_FILTER_ARTICLE", payload: name });

const mapDispatchToProps = dispatch => {
  return {
    AddArticle: (article) => dispatch(AddArticle(article)),
    UpdateArticle: (article) => dispatch(UpdateArticle(article)),
    DeleteArticle: (article) => dispatch(DeleteArticle(article)),
    SetFilterArticle: (name) => dispatch(SetFilterArticle(name))
  };
}

const Articles = connect(mapStateToProps,mapDispatchToProps)(ArticlesTemp);

export default Articles;
