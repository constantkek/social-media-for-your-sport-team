import React from 'react'
import { Post } from './Post'
import { List } from 'antd'


export const Updates = () => {
    const post1 = {
        username: 'oxana', 
        sportTitle: 'Ultimate',
        desc: 'Evening training',
        date: new Date(2020, 2, 6),
        likes: 11, 
        dislikes: 1,
        action: 'liked'
    }
    const post2 = {
        username: 'simonov', 
        sportTitle: 'Tabata',
        desc: 'Fastest training in a wild east',
        date: new Date(2020, 2, 5),
        likes: 13, 
        dislikes: 3,
        action: null
    }
    const allPosts = [post1, post2]
    const posts = []
    allPosts.forEach(p => {
        posts.push(Post(p))
    })
    return (
        <div className="outerPosts">
            <div className="innerPosts">
                <List
                bordered
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
                />
            </div>
        </div>
    )
}