import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { Hub } from './pages/Hub'

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/hub" exact>
                    <Hub />
                </Route>
                <Redirect to="/hub"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}