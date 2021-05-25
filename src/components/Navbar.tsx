import {
  AppBar,
  // Badge,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Theme,
} from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
// import NotificationsIcon from '@material-ui/icons/Notifications'
import { DRAWER_WIDTH } from './Layout'
import { UserButton } from './UserButton'

interface Props {
  open: boolean
  setOpen: CallableFunction
}

export const Navbar: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles()

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Workflow
        </Typography>

        <UserButton />

        {/* <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },

    menuButton: {
      marginRight: 36,
    },

    menuButtonHidden: {
      display: 'none',
    },

    title: {
      flexGrow: 1,
    },
  })
)
