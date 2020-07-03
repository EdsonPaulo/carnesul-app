import React, { useReducer, useMemo } from 'react'
import axios from "axios"
import { AsyncStorage } from "react-native"

import AuthContext from './auth-context'
import { authReducer, LOGIN, LOGOUT, REGISTER, RETRIEVE_TOKEN } from './auth-reducer'
import { constants } from '../../constants'

const AuthProvider = props => {

  const initialAuthState = {
    user: null,
    token: null,
    isLogged:  true
  }

  const [authState, dispatch] = useReducer(authReducer, { initialAuthState })

  const checkLoggedState = async () => {
    try {
      const token = await AsyncStorage.getItem(constants.TOKEN_KEY)
      console.log('esta logado?: ' + !!token)
      if (token)
        return true
      return false
    } catch (error) {
      throw new Error(error)
    }
  }


  const login = async (user, token) => {
    try {
      //STORE DATA
      await AsyncStorage.multiSet([
        [constants.USER_KEY, JSON.stringify(user)],
        [constants.TOKEN_KEY, token]
      ])
      console.log('logou: ' + initialAuthState.isLogged)
      //AXIOS AUTHORIZATION HEADER
      //    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      //DISPATCH TO REDUCER
      dispatch({ type: LOGIN, user: user, token: token })
    } catch (error) {
      throw new Error(error)
    }
  }

  const logout = async () => {
    try {
      //REMOVE DATA
      await AsyncStorage.multiRemove([
        constants.TOKEN_KEY,
        constants.USER_KEY
      ])
      //AXIOS AUTHORIZATION HEADER
      //  delete axios.defaults.headers.common["Authorization"]
      //DISPATCH TO REDUCER
      dispatch({ type: LOGOUT });
    } catch (error) {
      throw new Error(error);
    }
  }

  const retrieveToken = token => {
    dispatch({ type: RETRIEVE_TOKEN, token: token })
  }

  const register = (user, token) => {
    dispatch({ type: REGISTER, user: user, token: token })
  }

  const value = useMemo(() => {
    return {
      isLogged: authState.isLogged,
      token: authState.token,
      user: authState.user,
      login: login,
      logout: logout,
      retrieveToken: retrieveToken,
      register: register
    }
  }, [authState])

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider