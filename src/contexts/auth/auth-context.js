import React from 'react';

export default React.createContext({
  user: {},
  token: '',
  isLogged: true,
  login: (user, token) => { },
  logout: () => { },
  retrieveToken: token => { },
  register: (user, token) => { }
})
