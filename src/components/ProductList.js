import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  //06 grab the data i need and give them an alias from filtercontext
  const { filtered_products: products, grid_view } = useFilterContext()
  //06 pass the products as prop to the gridview component or to the listview based on the value of the boolean gridview
  if (!products) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search....
      </h5>
    )
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <GridView products={products}>product list</GridView>
}

export default ProductList
