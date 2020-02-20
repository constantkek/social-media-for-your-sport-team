import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
    const [ready, setReady] = useState(false)
    const [username, setUsername] = useState(null)
    const [userID, setUserID] = useState(null)
    const login = useCallback((username, id) => {
        setUsername(username)
        setUserID(id)
        localStorage.setItem('userData', JSON.stringify({ username, userID: id }))
    }, [])
    const logout = useCallback(() => {
        setUsername(null)
        setUserID(null)
        localStorage.removeItem('userData')
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data) {            
            login(data.username, data.userID)
        }
        setReady(true)
    }, [login])
    return { login, logout, ready, username, userID }
}