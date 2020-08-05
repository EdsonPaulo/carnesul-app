import React, { useReducer, useMemo } from 'react'
//import axios from "axios"
import { AsyncStorage } from "react-native"

import AuthContext from './auth-context'
import { authReducer, LOGIN, LOGOUT, REGISTER, RETRIEVE_TOKEN } from './auth-reducer'
import { constants } from '../../constants'

const AuthProvider = props => {

  const [authState, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLogged: false,
    isLoading: true
  })

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
      await AsyncStorage.multiSet([
        [constants.USER_KEY, JSON.stringify(user)],
        [constants.TOKEN_KEY, token]
      ])
      console.log('logou: ' + authState.isLogged)
      //    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      dispatch({ type: LOGIN, user, token })
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
      //  delete axios.defaults.headers.common["Authorization"]
      dispatch({ type: LOGOUT });
    } catch (error) {
      throw new Error(error);
    }
  }

  const retrieveToken = async () => {
    let user, token;
    try {
      token = await AsyncStorage.getItem(constants.TOKEN_KEY);
      user = await AsyncStorage.getItem(constants.USER_KEY);
    } catch (e) {
      // Restoring token failed
    }

    // After restoring token, we may need to validate it in production apps
    dispatch({ type: RETRIEVE_TOKEN, token, user })
  }

  const register = async (user, token) => {
    try {
      await AsyncStorage.multiSet([
        [constants.USER_KEY, JSON.stringify(user)],
        [constants.TOKEN_KEY, token]
      ])
      //    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      dispatch({ type: REGISTER, user, token })
    } catch (error) {
      throw new Error(error)
    }
  }



  const value = useMemo(() => {
    return {
      user: authState.user,
      token: authState.token,
      isLogged: !!authState.token,
      isLoading: authState.isLoading,

      login: login,
      logout: logout,
      register: register,
      retrieveToken: retrieveToken,
      checkLoggedState: checkLoggedState
    }
  })

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider