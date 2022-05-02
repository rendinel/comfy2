export const formatPrice = (number) => {
  //js method that we pass the local('en-US','de-DE'ecc.) then we pass the style and the currency in which we want to format our number and we also divide that number by 100 because our numbers are in cents
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
  return newNumber
}

//we take 2 data the array with all the products and the string type,we map over the array and access the type and get an array with all the data not only the unique and then pass the array to the set method to obtain only the unique value, if the type is colors we get back an array of array so we need to use the flat method in order to obtain a single array with all the data and after that we pass it to the set method
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}
