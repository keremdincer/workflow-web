import {
  AppBar,
  // Badge,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
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
    <AppBar position="fixed" className={classes.appBar}>
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

        <div className={classes.spacer} />

        <UserButton />
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
      },
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
      paddingRight: theme.spacing(2), // keep right padding when drawer closed
    },

    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },

    menuButtonHidden: {
      display: 'none',
    },

    spacer: {
      flexGrow: 1,
    },
  })
)
