import React, { Fragment, SyntheticEvent, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  makeStyles,
  TextField,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { GET_CORPORATIONS } from './CorporationsPage'

const CREATE_CORPORATION = gql`
  mutation createCorporation($name: String!) {
    createCorporation(name: $name) {
      id
    }
  }
`

export const CorporationDialog: React.FC = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [createCorporation] = useMutation(CREATE_CORPORATION, {
    variables: { name },
    refetchQueries: [{ query: GET_CORPORATIONS }],
  })

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      const result = await createCorporation()
      setName('')
      setOpen(false)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
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
        aria-labelledby="project dialog"
      >
        <form onSubmit={submit}>
          <DialogTitle>Firma Oluştur</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Yeni bir firma oluşturmak için aşağıdaki alanları doldurun.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="corporation-name"
              label="Firma Adı"
              type="text"
              fullWidth
              value={name}
              autoComplete="off"
              required
              onChange={(e) => setName(e.currentTarget.value)}
            />
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
}))
