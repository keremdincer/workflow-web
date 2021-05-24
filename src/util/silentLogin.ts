import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { isFuture } from 'date-fns'
import { decode } from 'jsonwebtoken'

interface Token {
  exp: number
}

interface RefreshTokenResponse {
  data: {
    refresh: {
      accessToken: string
      refreshToken: string
    }
  }
}

// Refresh Token Query
const REFRESH_TOKEN = gql`
  mutation refresh($token: String!) {
    refresh(token: $token) {
      accessToken
      refreshToken
    }
  }
`

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

export const silentLogin = async () => {
  let accessToken = localStorage.getItem('access_token') || ''
  let refreshToken = localStorage.getItem('refresh_token') || ''

  if (isTokenValid(accessToken)) {
    return { accessToken }
  }

  if (!isTokenValid(refreshToken)) {
    return { accessToken: null }
  }

  try {
    const { data } = (await refresh(refreshToken)) as RefreshTokenResponse
    localStorage.setItem('access_token', data.refresh.accessToken)
    localStorage.setItem('refresh_token', data.refresh.refreshToken)
    return { accessToken: data.refresh.accessToken }
  } catch {
    return { accessToken: null }
  }
}

const refresh = (token: string) => {
  return client.mutate({
    mutation: REFRESH_TOKEN,
    variables: { token },
  })
}

const isTokenValid = (token: string) => {
  try {
    const { exp } = decode(token) as Token
    return isFuture(new Date(exp * 1000))
  } catch {
    return false
  }
}
