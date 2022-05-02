import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
//01 we import the reducers fuction from the reducers folder
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
//01 we import our actions setted up as variable into actions to avoid typo
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

//01 our initial state object where we have a boolean(issidebaropen) that toggle our navbar
const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  //01 we call usereducer hook that allow us to access our state(initialstate) and the dispatch function that allow us to modify our initialstate and we pass to param to our usereducer the reducer function and our initial state
  const [state, dispatch] = useReducer(reducer, initialState)

  //01 function that dispatch the sidebar open action
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  //01 function that dispatch the sidebar close action
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  // 02 function that dispatch the products begin action so the productisloading is turned to true to display the spinner ,then we fetch the data from the api and pass them as a payload, if some error happen we dispatch the getproductserror action to handle them
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url)
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  //04 fetch the single product launch getsingleproduct to turn the spinner to true and clean precedent error(if there are some) get the data of the singleproduct and pass them as a payload
  const fetchSingleProducts = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(url)
      const singleProduct = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  //02 use effect that run when we load the page and fetch the products from the api
  useEffect(() => {
    fetchProducts(url)
  }, [])

  //01 we pass down the value we need to access in the app
  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProducts }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
