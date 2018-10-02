import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LABELS from '../constants/labels';
import BaseRecord from './BaseRecord'
import { searchNoCase } from '../constants/utils.js'

export class ArticlesTemp extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.fieldList = ["name","type","year","category","price"];
  }

  search(e, { value }) {
    this.props.SetFilterArticle(value)
  }

  render() {
    const valuesList = this.props.articles.filter( item => searchNoCase(item.name,this.props.filters.article) )
    return (
      <BaseRecord
        title={LABELS.ARTICLES}
        searchHandler={this.search}
        searchValue={this.props.filters.article}
        newHandler={this.props.AddArticle}
        updateHandler={this.props.UpdateArticle}
        deleteHandler={this.props.DeleteArticle}
        fieldsList={this.fieldList}
        valuesList={valuesList}
      />
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
