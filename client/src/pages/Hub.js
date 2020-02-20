import React, { useState, useCallback, useContext, useEffect } from 'react'
import { MyHeader as Header } from '../components/Header'
import { Friends } from '../components/Friends'
import { Team } from '../components/Team'
import { Updates } from '../components/Updates'
import { HeaderContext } from '../context/header.context'
import { AuthContext } from '../context/auth.context'
import { FriendsContext } from '../context/friends.context';
import { useHttp } from '../hooks/http.hook'
import '../App.css'

export const Hub = () => {
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [menuState, setMenuState] = useState({
        current: 'updates'
    })
    const [friends, setFriends] = useState()
    const fetchFriends = useCallback(async () => {
        try {            
            const data = await request('/api/hub/friends', 'GET', null, {
                userid: auth.userID
            })
            setFriends(data.friends)
        } catch (e) {
            console.log('Some error: ', e);
        }
    }, [request, auth.userID])
    useEffect(() => {
        fetchFriends()
    }, [fetchFriends])
    switch (menuState.current) {
        case 'team':
            return (
            <div>
                <HeaderContext.Provider value={{
                    menuState, setMenuState
                }}>
                    <Header />
                </HeaderContext.Provider>
                    <Team />
            </div>
        )
        case 'friends':
            return (
            <div>
                <HeaderContext.Provider value={{
                    menuState, setMenuState
                }}>
                    <Header />
                </HeaderContext.Provider>
                <FriendsContext.Provider value={{
                    friends
                }}>
                    <Friends />
                </FriendsContext.Provider>
            </div>
        )
        case 'updates':
            return (
            <div>
                <HeaderContext.Provider value={{
                    menuState, setMenuState
                }}>
                    <Header />
                </HeaderContext.Provider>
                    <Updates />
            </div>
        )
        default:
            return (
            <div>
                <HeaderContext.Provider value={{
                    menuState, setMenuState
                }}>
                    <Header />
                </HeaderContext.Provider>
                    <p>Error occured</p>
            </div>
        )
    }
}