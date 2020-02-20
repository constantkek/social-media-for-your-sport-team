import React, { useState, useContext } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { useHttp } from '../hooks/http.hook';
import { message } from 'antd'
import { AuthContext } from '../context/auth.context';
import '../App.css'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const [regForm, setRegForm] = useState({
        username: "",
        password: "",
        firstname: "", 
        lastname: ""
    })
    const regHandler = async () => {
        try {
            const data = await request('/api/auth/reg', 'POST', regForm)
            message.success(data.message)
        } catch (e) {
            message.error(e.message)
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', loginForm)
            auth.login(data.username, data.userID)            
            message.success(data.message)
        } catch (e) {
            message.error(e.message)
        }
    }
    const changeLoginHandler = event => {
        setLoginForm({...loginForm, [event.target.name]: event.target.value})
    }
    const changeRegHandler = event => {
        setRegForm({...regForm, [event.target.name]: event.target.value})
    }
    return (
    <div>
        <h1>Work it out</h1>
        <h3>Pass authentication</h3>
        <div className="container">
            <div className="login">
                <Form>
                    <Form.Item>
                        <Input
                        id="username-login"
                        name="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.75)' }} />}
                        placeholder="Username"
                        value={loginForm.username}
                        onChange={changeLoginHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                        id="password-login"
                        name="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.75)' }} />}
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={changeLoginHandler}
                        onPressEnter={loginHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                        onClick={loginHandler} 
                        type="primary" 
                        htmlType="submit" 
                        className="Button"
                        disabled={loading}
                        >
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="void"></div>
            <div className="reg">
                <Form>
                    <Form.Item>
                        <Input
                        id="firstname"
                        name="firstname"
                        prefix={<Icon id="icon-smile" type="smile" style={{ color: 'rgba(0,0,0,.75)' }} />}
                        placeholder="First Name"
                        value={regForm.firstname}
                        onChange={changeRegHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                        id="lastname"
                        name="lastname"
                        prefix={<Icon type="meh" style={{ color: 'rgba(0,0,0,.75)' }} />}
                        type="lastname"
                        placeholder="Last Name"
                        value={regForm.lastname}
                        onChange={changeRegHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                        id="username-reg"
                        name="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.75)' }} />}
                        placeholder="Username"
                        value={regForm.username}
                        onChange={changeRegHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                        id="password-reg"
                        name="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.75)' }} />}
                        type="password"
                        placeholder="Password"
                        value={regForm.password}
                        onChange={changeRegHandler}
                        onPressEnter={regHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                        onClick={regHandler} 
                        type="secondary" 
                        htmlType="submit" 
                        className="Button"
                        disabled={loading}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
    )
}