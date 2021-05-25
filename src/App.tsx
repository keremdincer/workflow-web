import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { LoginPage } from './Login/LoginPage'
import { HomePage } from './Home/HomePage'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
