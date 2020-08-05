export const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REGISTER = 'REGISTER'

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case RETRIEVE_TOKEN:
      return {
        ...prevState,
        token: action.token,
        user: action.user,
        isLogged: !!action.token,
        isLoading: false
      }
    case LOGIN:
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isLogged: true
      }
    case LOGOUT:
      return {
        ...prevState,
        user: null,
        token: null,
        isLogged: false
      }
    case REGISTER:
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isLogged: true
      }
  }

  
}

