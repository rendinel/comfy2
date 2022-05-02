//01 we import all the components we need and them export them so we can import them on a single line where needed instead of importing one component at time
import Home from './HomePage'
import Products from './ProductsPage'
import SingleProduct from './SingleProductPage'
import About from './AboutPage'
import Cart from './CartPage'
import Error from './ErrorPage'
import Checkout from './CheckoutPage'
import PrivateRoute from './PrivateRoute'

export {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
}
