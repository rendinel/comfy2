import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    //grab the data from yhe payload
    const { id, color, amount, product } = action.payload
    // we check if the item id+color it's already in the cart
    const tempItem = state.cart.find((i) => i.id === id + color)
    //if the item is already in the cart we check if that color is already in the cart, if color is already there we add the amount while checking the maxstock,
    // otherwise we simply add the item to the cart
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      //if the tempitem is'not in the cart we create it and add it to the cart
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  //11 we filter the cart and return all the item that meet our condition and use it to set as our cart
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  //11 simply empty the cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  //11 map over our cart and if the id match we add or subtract 1 to the amount and do the needed check before adding or subtracting
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      } else {
        return item
      }
    })
    return { ...state, cart: tempCart }
  }
  //deconstruct what we return from the reducer and use it to modify the state, on the cart array that we iterate over we grab amount and price and we calculate the total number of price and the total price
  if (action.type === COUNT_CART_TOTALS) {
    const { total_amount, total_items } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    )
    return { ...state, total_amount, total_items }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
