import React, { useReducer, useMemo} from 'react';

import ShopContext from './shop-context';
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from './shop-reducer';

const ShopProvider = props => {

  const [cartState, dispatch] = useReducer(shopReducer, { cart: [] })

  const addProductToCart = product => {
    dispatch({ type: ADD_PRODUCT, product: product })
  }

  const removeProductFromCart = productId => {
    dispatch({ type: REMOVE_PRODUCT, productId: productId })
  }

  const incrementProductQuantity = productId => {
    dispatch({ type: INCREMENT_QUANTITY, productId: productId })
  }

  const decrementProductQuantity = productId => {
    dispatch({ type: DECREMENT_QUANTITY, productId: productId })
  }

  const value = useMemo(() => {
    return { 
      cart: cartState.cart,
      addProductToCart: addProductToCart,
      removeProductFromCart: removeProductFromCart,
      incrementProductQuantity: incrementProductQuantity,
      decrementProductQuantity: decrementProductQuantity
    }
  }, [cartState])

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopProvider;
