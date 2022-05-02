import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  //06 just grab the products passed as payload and use them to set all products and filtered products, we need to pass them with spread operator otherwise js will reuse the original one
  //08 map over the products price,grab the max price with the math max method(it doesen't work on array so i pass the data with the spread operator) and use this so set the max price and the price of the filter
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }
  // 06 this 2 action toggle the value of gridview displaying the list or the grid
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  //07 action that set the select option to the value of the option we select
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  //07 with sort we compare two value the current and the next one, we need to provide a comparing function or elements are sorted by converting them to strings and comparing strings in UTF-16 code units order.IN the long way to return a before b we need to return -1 if a is less then b, if a is bigger then b we need to return 1 or return 0 if a and b are equal.The short way where we subtract a to b sort the array in ascending order, the same goes for the other 3 function
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = [...filtered_products]
    // if (sort === 'price-lowest') {
    //   tempProducts = tempProducts.sort((a, b) => {
    //     if (a.price < b.price) {
    //       return -1
    //     }
    //     if (a.price > b.price) {
    //       return 1
    //     }
    //     return 0
    //   })
    // }
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: tempProducts }
  }
  //08  grab my data from the payload then use this data to dinamically set name and value, whatever value i'm passing as a name use it to be the key of the collection i'm adding to the object, so we can access dinamically the property inside the filters object based on the name we are passing from the input and set the value to be the value we are typing
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  //08/09 we grab the all products array from the state, then we copy it inside the temProducts and use it to set it equal to our filteredproducts,tempproducts will be responsable for the filtering,we also grab the data from filters object to filter them
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters
    let tempProducts = [...all_products]
    //if text is true(so if i typed something) we use the filter method on our array and return every item which name start with the text we are typing
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    //company if the company is different from all we return the company that match the company we selected on
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      )
    }
    //category if the category is different from all we return the category that match the category we clicked on
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }
    //colors, if the color is different from all we run first filter on the array tempProducts and then the find method on the colors array to return only the color that match the one we clicked on
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }
    // price return the value that are less or equal to price
    tempProducts = tempProducts.filter((product) => product.price <= price)
    //shipping return only the product where shipping is true
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }
    return { ...state, filtered_products: tempProducts }
  }
  //09 action that set our filters to the initial state clearing
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
