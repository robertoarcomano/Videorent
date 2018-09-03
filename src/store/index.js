import { createStore } from 'redux';

// Default state
const initialState = {
  active: "",
  articles: ["first", "second"],
  customers: ["first", "second"],
  filters: {
    article: "",
    customer: ""
  }
}

const reducer = (state = initialState, action) => {
  // Switch action.type
  switch (action.type) {
    case "ACTIVATE":
      return Object.assign({}, state, { active: action.payload});
    case "SET_FILTER_ARTICLE":
      console.log("store: old_filter_article: " + state.filters.article)
      return Object.assign({}, state, { filters: { article: action.payload, customer: state.filters.customer }})
    case "SET_FILTER_CUSTOMER":
      console.log("store: old_filter_customer: " + state.filters.customer)
      return Object.assign({}, state, { filters: { customer: action.payload, article: state.filters.article }})
    case "ADD_ARTICLE":
      const filterArticle = state.filters.article;
      return Object.assign({}, state, {
        articles: state.articles.concat(filterArticle),
        filters: {
          article: "",
          customer: state.filters.customer
        }
      });
    case "ADD_CUSTOMER":
      const filterCustomer = state.filters.customer;
      return Object.assign({}, state, {
        customers: state.customers.concat(filterCustomer),
        filters: {
          customer: "",
          article: state.filters.article
        }
      });
    default:
      return state
  }
}

// Create Store
const store = createStore(reducer,initialState);

export default store;
