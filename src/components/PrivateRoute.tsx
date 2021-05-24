import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  path: string
  exact?: boolean
  component?: React.ComponentType<any> | undefined
}

export const PrivateRoute: React.FC<Props> = ({ path, exact, component }) => {
  const auth = useAuth()

  if (!auth.user) {
    return <Redirect to="/login" />
  }

  return <Route path={path} exact={exact} component={component} />
}
