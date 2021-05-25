import React from 'react'
import { Layout } from '../components/Layout'
import { UserList } from './UserList'

export const HomePage = () => {
  return (
    <Layout>
      <UserList />
    </Layout>
  )
}
