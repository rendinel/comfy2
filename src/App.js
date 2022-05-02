import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//01 we import all the components from the index we set up inside components folder
import { Navbar, Sidebar, Footer } from './components'
//01 we import all the components from the index we set up inside pages folder
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
} from './pages'
//01 we set up the router,then inside we put navbar,sidebar and footer outside of the switch because they are going to appear in all the page, then inside the switch we place all the components inside a route with exact path so only the first route that match our path will display, the only 2 difference are the error page that have a path of * so it will appear with all the pages that doesen't exist so doesen't have a path that match and the single product page that will have a dinamic id (:id) and a children prop where we place the component that we want to render based on the id we fetch
function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />} />
        <Route exact path='/checkout'>
          <Checkout />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}
export default App
