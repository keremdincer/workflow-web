import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { LoginPage } from './Login/LoginPage'
import { HomePage } from './Home/HomePage'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import { ProjectsPage } from './Projects/ProjectsPage'
import { CorporationsPage } from './Corporations/CorporationsPage'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={HomePage} />
          <PrivateRoute path="/projects" exact component={ProjectsPage} />
          <PrivateRoute
            path="/corporations"
            exact
            component={CorporationsPage}
          />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
