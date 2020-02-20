import React from 'react'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/auth.context'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Loader } from './components/Loader'

function App() {
  const { login, logout, ready, username, userID } = useAuth()
  const isAuth = !!username
  const routes = useRoutes(isAuth)
  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      login, logout, username, userID
    }}>
      <Router>
        <div className="App">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;