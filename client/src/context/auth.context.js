import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
    userID: null,
    username: null, 
    login: noop,
    logout: noop,
    isAuth: false
})