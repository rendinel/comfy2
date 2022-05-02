import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

//07 the sort is responsable of the sorting with the select so it's default value need to match one of the value of the option
const initialState = {
  filter_product: [],
  all_products: [],
  grid_view: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  //06 grab all the data i need from useproductscontext
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  //06 useeffect that dispatch the action and pass the products as payload,we pass products as dependency because at the start the products array is empty so every time it change the useeffect will run
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])
  //07 run every time products or our sort change
  //08 also when filter change
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])
  //06 function to change the view from list to grid and the other way around
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  //07 we access the name and the value from the select option and send it as a payload to the reducer
  const updateSort = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }
  //08 grab the name and the value i'm passing from filters component and pass them as a payload to the reducer
  //09 if the value we need to access is passed from a button we can't access with e.target.value but we need to access e.target.textContent so we can access the text inside the button, another way to access the data from a button is the dataset e.target.dataset.color so from the html we can pass the data-color
  //09 we need to run Number on the value we get from price because it's a string and we need to convert it back to a number
  //09 we can access the value of the checkbox that is a boolean with e.target.checked
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
