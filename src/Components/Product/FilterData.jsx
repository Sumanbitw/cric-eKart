export const getFilteredData = ( products, state) => {
  let filteredProducts = [...products]
  console.log(products, state)
  console.log(filteredProducts)
  
  filteredProducts = filteredProducts.filter(({fastDelivery}) => state.showFastDeliveryOnly ? fastDelivery : true )


  filteredProducts = filteredProducts.filter(({inStock}) => state.showInventoryAll ? true : inStock )


  filteredProducts = filteredProducts.filter(item => parseInt(item.price <= state.maxValue ))


  if(state.categories.length !== 0){
    filteredProducts = filteredProducts.filter(category => state.categories.includes(category))
  }


  if(state.ratings.length !== 0){
    filteredProducts = filteredProducts.filter(rating => state.ratings.includes(rating))
  }
  return filteredProducts
}