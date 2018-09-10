import { createStore } from 'redux';
import { now } from '../constants/utils.js'

// Default state
const initialState = {
  active: "",
  articles: [
    { name: "John Wick", type: "DVD", year: "2014", category: "Action", price: 3 } ,
    { name: "John Wick 2", type: "BlueRay", year: "2017", category: "Action", price: 4 }
  ],
  customers: [
    { name: "first", cell: "34012345678" } ,
    { name: "second", cell: "34712345678" }
  ],
  rentals: [
    { customer: "first", articles: [{name: "John Wick", date: "10/09/2018"},{name: "John Wick 2", date: "09/09/2018"}] }
  ],
  filters: {
    article: "",
    customer: ""
  },
  customer: ""
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
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload),
        filters: {
          article: "",
          customer: state.filters.customer
        }
      });
    case "UPDATE_ARTICLE":
      return Object.assign({}, state, {
        articles: state.articles.map( article => {
          if (article.name === action.payload.name)
            article = action.payload;
          return article;
        }),
        filters: {
          article: "",
          customer: state.filters.customer
        }
      });
    case "DELETE_ARTICLE":
      return Object.assign({}, state, {
        articles: state.articles.filter( item => item.name !== action.payload.name),
        filters: {
          article: "",
          customer: state.filters.customer
        }
      });
    case "ADD_CUSTOMER":
      return Object.assign({}, state, {
        customers: state.customers.concat(action.payload),
        filters: {
          article: state.filters.article,
          customer: ""
        }
      });
    case "UPDATE_CUSTOMER":
      return Object.assign({}, state, {
        customers: state.customers.map( customer => {
          if (customer.name === action.payload.name)
            customer = action.payload;
          return customer;
        }),
        filters: {
          customer: "",
          article: state.filters.article
        }
      });
    case "DELETE_CUSTOMER":
      return Object.assign({}, state, {
        customers: state.customers.filter( item => item.name !== action.payload.name),
        filters: {
          customer: "",
          article: state.filters.article
        }
      });
    case "SET_CUSTOMER":
      return Object.assign({}, state, {
        customer: action.payload
      });
    case "RETURN_ARTICLE":
      return Object.assign({}, state, {
        rentals: state.rentals.map(
          rental => {
            console.log("rental: " + JSON.stringify(rental))
            if (rental.customer == state.customer.name)
              rental.articles = rental.articles.filter( article => article.name !== action.payload)
            return rental;
          }
        )
      });
    case "RENT_ARTICLE":
      let tmpState = state;
      let existCustomer = tmpState.rentals.find( rental => rental.customer === tmpState.customer.name)
      if (!existCustomer)
        tmpState.rentals = tmpState.rentals.concat(
          {
            customer: tmpState.customer.name,
            articles: [{ name: action.payload, date: now() }]
          }
        )
      else
        tmpState.rentals = tmpState.rentals.map(
          rental => {
            console.log("rental: " + JSON.stringify(rental))
            if (rental.customer == tmpState.customer.name)
              rental.articles = rental.articles.concat({ name: action.payload,date: now() })
            return rental;
          }
        )
      return Object.assign({}, state, tmpState);
    default:
      return state
  }
}

// Create Store
const store = createStore(reducer,initialState);

export default store;
