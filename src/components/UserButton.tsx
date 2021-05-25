import React, { Fragment, useRef, useState } from 'react'
import {
  Avatar,
  Button,
  ClickAwayListener,
  createStyles,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
  Typography,
} from '@material-ui/core'
import { useAuth } from '../contexts/AuthContext'

export const UserButton = () => {
  const auth = useAuth()
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    // TODO: Daha iyi bir yol ile yapılabilir. AuthContext üzerinden.
    window.location.reload()
  }

  return (
    <Fragment>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={() => setOpen((s) => !s)}
      >
        <Avatar className={classes.avatar}></Avatar>
        <Typography color="inherit" className={classes.text}>
          {auth.user!.firstName} {auth.user!.lastName}
        </Typography>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={() => setOpen(false)}
                >
                  {/* <MenuItem onClick={() => setOpen(false)}>Profile</MenuItem>
                  <MenuItem onClick={() => setOpen(false)}>My account</MenuItem> */}
                  <MenuItem onClick={logout}>Çıkış</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      color: 'white',
    },
    avatar: {
      marginRight: theme.spacing(1),
    },
  })
)
