import { createContext } from 'react'

function noop() {}

export const FriendsContext = createContext({
    friends: null
})