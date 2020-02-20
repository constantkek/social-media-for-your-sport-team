import React from 'react'
import { Spin } from 'antd'
import '../App.css'

export const Loader = () => {
    return (
        <div className="spin">
            <Spin size="large"/>
        </div>
    )
}