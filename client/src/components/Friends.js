import React, { useContext } from 'react'
import { FriendsContext } from '../context/friends.context';

export const Friends = () => {
    const data = useContext(FriendsContext)
    return (
        <div className="friends">
            <p>{data.friends[0].friend}</p>
        </div>
    )
}