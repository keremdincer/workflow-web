import { Paper, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { TabPanel } from './TabPanel'
import { UserDialog } from './UserDialog'
import { UserList } from './UserList'

export const AdminPage = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Layout>
      <Paper square>
        <Tabs
          value={tabIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, index) => setTabIndex(index)}
          aria-label="Admin Tabs"
        >
          <Tab label="Kullanıcılar"></Tab>
          <Tab label="..." disabled></Tab>
        </Tabs>
      </Paper>

      <TabPanel value={tabIndex} index={0}>
        <UserList />

        <UserDialog />
      </TabPanel>
    </Layout>
  )
}
