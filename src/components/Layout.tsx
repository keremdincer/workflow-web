import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <div className={classes.root}>
      <Navbar open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer}></div>
        {children}
      </main>
    </div>
  )
}

export const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
)
