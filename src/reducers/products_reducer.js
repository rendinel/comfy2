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
//01 we get 2 param state that is the oldstate before the update and the action we want to perform
const products_reducer = (state, action) => {
  //01 if the action type is sidebaropen we change the value of issidebaropen to true opening the sidebar and leave the other value of initialstate unchanged
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }
  //01 if the action type is sidebarclose we change the value of issidebaropen to false closing the sidebar and leave the other value of initialstate unchanged
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }
  //02 we use to turn our productsloading to true and use this value to display/hide a spinner
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }
  //02 we are passing the products as a payload, we filter them and return only the product where featured is true, then we return the state turning the loading to false to toggle tne spinner , we set our products to be the payload we are passing and our featured_products to be the featured_products we just filtered
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    )
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    }
  }
  //02 we turn the error to true
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }
  }
  //04 we return the state and turn the loading to true and have the spinner appear and the error to false because there could be some error from some previous fetching
  if (action.type === GET_PRODUCTS_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    }
  }
  //04 we return our state,turn the loading to false to make the spinner disappear and set the single product to be equal to the payload
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    }
  }
  //04 we turn the error to true and the loading to false
  if (action.type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
