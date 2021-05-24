import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { createContext, useContext } from 'react'

interface Role {
  id: number
  label: string
}

interface CurrentUser {
  id: number
  email: string
  firstName: string
  lastName: string
  roles: Role[]
}

interface AuthContextConfig {
  user?: CurrentUser
}

export const AuthContext = createContext<AuthContextConfig>(
  {} as AuthContextConfig
)

export const GET_ME = gql`
  {
    me {
      id
      email
      firstName
      lastName
      roles {
        id
        label
      }
    }
  }
`

export const AuthProvider: React.FC = ({ children }) => {
  const { loading, data } = useQuery(GET_ME)

  if (loading) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user: data?.me }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
