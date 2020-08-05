import React from 'react';

export default React.createContext({
    user: false,
    token: null,
    isLogged: false,
    isLoading: true,
    
    login: (user, token) => {},
    logout: () => {},
    register: (user, token) => {},
    retrieveToken: () => {},
    checkLoggedState: () => {}
})
