import React, { Fragment, useState } from 'react'
import {
  AppBar,
  Avatar,
  createStyles,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useAuth } from '../contexts/AuthContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
  })
)

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const auth = useAuth()

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Avatar className={classes.avatar}>
            {auth.user?.firstName.charAt(0)}
            {auth.user?.lastName.charAt(0)}
          </Avatar>
          <Typography variant="h6" className={classes.title}>
            {auth.user?.firstName + ' ' + auth.user?.lastName}
          </Typography>

          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Toolbar>
          <Tabs value={value} onChange={(_event, number) => setValue(number)}>
            <Tab label="Kullanıcılar" {...a11yProps(1)}></Tab>
          </Tabs>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </Fragment>
  )
}

export default Layout
