import { ToastAndroid } from "react-native"

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY'
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY'

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart]
  const updatedItemIndex = updatedCart.findIndex(item => item.id === product.id)
  if (updatedItemIndex < 0) {
    product.quantity ? updatedCart.push(product) : updatedCart.push({ ...product, quantity: 1 })
    ToastAndroid.show('Produto adicionado com sucesso', ToastAndroid.SHORT)
  }
  else {
    const updatedItem = { ...updatedCart[updatedItemIndex] }
    updatedItem.quantity += product.quantity || 1
    updatedCart[updatedItemIndex] = updatedItem
  }
  return { ...state, cart: updatedCart }
}


const removeProductFromCart = (productId, state) => {
  const updatedCart = [...state.cart]
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId)
  updatedCart.splice(updatedItemIndex, 1)
  return { ...state, cart: updatedCart }
}


const incrementProductQuantity = (productId, state) => {
  const updatedCart = [...state.cart]
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId)
  const updatedItem = { ...updatedCart[updatedItemIndex] }
  updatedItem.quantity++
  updatedCart[updatedItemIndex] = updatedItem
  return { ...state, cart: updatedCart }
}


const decrementProductQuantity = (productId, state) => {
  const updatedCart = [...state.cart]
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId)
  const updatedItem = { ...updatedCart[updatedItemIndex] }
  updatedItem.quantity--
  if (updatedItem.quantity <= 0)
    updatedCart.splice(updatedItemIndex, 1)
  else
    updatedCart[updatedItemIndex] = updatedItem
  return { ...state, cart: updatedCart }
}


export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state)
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state)
    case INCREMENT_QUANTITY:
      return incrementProductQuantity(action.productId, state)
    case DECREMENT_QUANTITY:
      return decrementProductQuantity(action.productId, state)
    default:
      return state
  }
}