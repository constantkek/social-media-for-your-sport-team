import React, { useContext } from 'react'
import { Button, Layout, Menu, Icon } from 'antd'
import { AuthContext } from '../context/auth.context'
import { HeaderContext } from '../context/header.context'
import '../App.css'

const { Header } = Layout

export const MyHeader = () => {
    const header = useContext(HeaderContext)
    const auth = useContext(AuthContext)
    const handleMenuClick = (event) => {
        header.setMenuState({ ...header.menuState, current: event.key })
    }
    const logoutHandler = () => {
        auth.logout()
    }
    return (
        <Header>
            <div className="header">
                <div className="title">
                    <h1>YISS</h1>
                </div>
                <div className="menu">
                    <Menu
                    onClick={handleMenuClick} 
                    selectedKeys={header.menuState.current} 
                    theme="dark"
                    mode="horizontal"
                    >
                        <Menu.Item key="updates">
                            <Icon type="rocket" />
                            Updates
                        </Menu.Item>
                        <Menu.Item key="team">
                            <Icon type="skin" />
                            Team
                        </Menu.Item>
                        <Menu.Item key="friends">
                            <Icon type="team" />
                            Friends
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="logout">
                <Button 
                type="primary"
                onClick={logoutHandler}
                className="logout">
                    Logout
                </Button>
            </div>
        </Header>
    )
}