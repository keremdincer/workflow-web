import React, { Fragment, SyntheticEvent, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  TextField,
} from '@material-ui/core'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { GET_USERS } from './UserList'

const REGISTER = gql`
  mutation register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    register(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      id
    }
  }
`

export const UserDialog = () => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()
  const [register] = useMutation(REGISTER)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await register({
      variables: { email, firstName, lastName, password },
      refetchQueries: [{ query: GET_USERS }],
    })
    setOpen(false)
  }

  return (
    <Fragment>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        aria-label="add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="user dialog"
      >
        <form onSubmit={submit}>
          <DialogTitle>Kullanıcı Oluştur</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Yeni bir kullanıcı oluşturmak için aşağıdaki alanları doldurun.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="user-email"
              label="Email"
              type="text"
              fullWidth
              value={email}
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.currentTarget.value)}
            ></TextField>

            <TextField
              margin="dense"
              id="user-first-name"
              label="Ad"
              type="text"
              fullWidth
              value={firstName}
              autoComplete="off"
              required
              onChange={(e) => setFirstName(e.currentTarget.value)}
            ></TextField>

            <TextField
              margin="dense"
              id="user-last-name"
              label="Soyad"
              type="text"
              fullWidth
              value={lastName}
              autoComplete="off"
              required
              onChange={(e) => setLastName(e.currentTarget.value)}
            ></TextField>

            <FormControl className={classes.passwordField}>
              <InputLabel htmlFor="standard-adornment-password">
                Şifre *
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="primary" variant="contained">
              Oluştur
            </Button>
            <Button
              onClick={() => setOpen(false)}
              color="default"
              variant="contained"
            >
              Vazgeç
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },

  passwordField: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
}))
