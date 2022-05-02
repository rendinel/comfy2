import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'
//01 we wrap our app in products provider so all the data from products_context will be passed to the whole app
//06 we place filter provider inside products provider so we can access al the data coming from it
//12 for auth we wrap our app inside the component with the needed data, we can get the data from the useAuth hook instead of using the usercontext
ReactDOM.render(
  <Auth0Provider
    domain='dev-29qpoopb.us.auth0.com'
    clientId='5HWHvctqmE6Oflv0xKsyZylgg6WeJbT5'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById('root')
)

// domain
// dev-29qpoopb.us.auth0.com

// client id
// 5HWHvctqmE6Oflv0xKsyZylgg6WeJbT5
