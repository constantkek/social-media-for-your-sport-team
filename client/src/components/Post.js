import React, { useState } from 'react'
import { Icon, Tooltip, Avatar, Comment } from 'antd'

export const Post = (data) => {
    const [actionState, setActionState] = useState({
        likes: data.likes, 
        dislikes: data.dislikes,
        action: data.action
    })
    const likeHandler = () => {
        if (actionState.action === null) {
            setActionState({
                likes: actionState.likes+1, 
                dislikes: actionState.dislikes, 
                action: 'liked'
            })
        } else if (actionState.action === 'disliked') {
            setActionState({
                likes: actionState.likes+1, 
                dislikes: actionState.dislikes-1, 
                action: 'liked'
            })
        } else if (actionState.action === 'liked') {
            setActionState({
                likes: actionState.likes-1, 
                dislikes: actionState.dislikes, 
                action: null
            })
        }
    }
    const dislikeHandler = () => {
        if (actionState.action === null) {
            setActionState({
                likes: actionState.likes, 
                dislikes: actionState.dislikes+1, 
                action: 'disliked'
            })
        } else if (actionState.action === 'disliked') {
            setActionState({
                likes: actionState.likes, 
                dislikes: actionState.dislikes-1, 
                action: null
            })
        } else if (actionState.action === 'liked') {
            setActionState({
                likes: actionState.likes-1, 
                dislikes: actionState.dislikes+1, 
                action: 'disliked'
            })
        }
    }
    const actions = [
        <span key="comment-basic-like">
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={actionState.action === 'liked' ? 'filled' : 'outlined'}
              onClick={likeHandler}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{actionState.likes}</span>
        </span>,
        <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={actionState.action === 'disliked' ? 'filled' : 'outlined'}
            onClick={dislikeHandler}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{actionState.dislikes}</span>
      </span>,
    ]
    return (
        <div className="post">
            <Comment
            actions={actions}
            author={data.username}
            avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
            }
            content={data.desc}
            datetime={data.sportTitle}
            />
        </div>
    )
}