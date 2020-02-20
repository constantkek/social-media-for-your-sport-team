import { createContext } from 'react'

function noop() {}

export const HeaderContext = createContext({
    menuState: null,
    setMenuState: noop()
})