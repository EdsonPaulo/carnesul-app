import React from 'react';

export default React.createContext({
  cart: [],
  addProductToCart: product => {},
  removeProductFromCart: productId => {},
  incrementProductQuantity: productId => {},
  decrementProductQuantity: productId => {}
});
