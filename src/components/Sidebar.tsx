import React from 'react'
import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { DRAWER_WIDTH } from './Layout'
import { SidebarLinks } from './SidebarLinks'

interface Props {
  open: boolean
  setOpen: CallableFunction
}

export const Sidebar: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles()

  const container =
    window !== undefined ? () => window.document.body : undefined

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <div className={classes.toolbarIcon}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Workflow
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <SidebarLinks />
          </List>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Workflow
            </Typography>
          </div>
          <Divider />
          <List>
            <SidebarLinks />
          </List>
        </Drawer>
      </Hidden>
    </nav>
  )
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    width: DRAWER_WIDTH,
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },

  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    paddingInline: theme.spacing(2),
    ...theme.mixins.toolbar,
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    paddingInline: theme.spacing(2),
    ...theme.mixins.toolbar,
  },

  title: {
    flexGrow: 1,
  },
}))
