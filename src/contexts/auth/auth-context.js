import React from 'react';

export default React.createContext({
  user: {},
  token: '',
  isLogged: false,
  login: (user, token) => { },
  logout: () => { },
  retrieveToken: token => { },
  register: (user, token) => { }
})
