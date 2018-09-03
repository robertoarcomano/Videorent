import React, { Component } from 'react';
import store from '../store/index';
import { connect } from 'react-redux';
import { Search, Header, Table, HeaderCell, Row, Cell, Label, Button, Grid, Column, Container, Menu, Divider, Segment, Image } from 'semantic-ui-react'
// Form, Field, Group, Input, Select, Label, Radio, TextArea, Checkbox, Button
import * as LABELS from '../constants/labels';
import BaseRecord from './BaseRecord'

export class ArticlesTemp extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(e, { value }) {
    console.log("search: " + value)
    console.log("filter: " + this.props.filters.article)
    this.props.SetFilterArticle(value)
  }

  render() {
    const valuesList = this.props.articles.filter( item => item.indexOf(this.props.filters.article) != -1)
    return (
      <BaseRecord
        title={LABELS.ARTICLES}
        searchHandler={this.search}
        searchValue={this.props.filters.article}
        newHandler={this.props.AddArticle}
        fieldsList="Name"
        valuesList={valuesList}
      />
    )
  }
}

const mapStateToProps = state => {
  return { articles: state.articles, filters: state.filters };
}

const AddArticle = (name) => ({ type: "ADD_ARTICLE", payload: name });
const SetFilterArticle = (name) => ({ type: "SET_FILTER_ARTICLE", payload: name });

const mapDispatchToProps = dispatch => {
  return {
    AddArticle: (name) => dispatch(AddArticle(name)),
    SetFilterArticle: (name) => dispatch(SetFilterArticle(name))
  };
}

const Articles = connect(mapStateToProps,mapDispatchToProps)(ArticlesTemp);

export default Articles;
