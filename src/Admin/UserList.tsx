import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Button, Checkbox, Chip } from '@material-ui/core'

export const GET_USERS = gql`
  query {
    users {
      id
      firstName
      lastName
      email
      active
      roles {
        id
        label
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chip: {
    marginRight: theme.spacing(2),
  },
}))

export const UserList: React.FC = () => {
  const classes = useStyles()
  const { loading, data, error } = useQuery(GET_USERS)

  if (loading) {
    return <p>Yükleniyor</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  const { users } = data

  return (
    <TableContainer component={Paper} square>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Ad</TableCell>
            <TableCell align="left">Soyad</TableCell>
            <TableCell align="left">Roller</TableCell>
            <TableCell align="left">Durum</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.firstName}</TableCell>
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left">
                {user.roles.map((role: any) => (
                  <Chip
                    key={role.id}
                    label={role.label}
                    size="small"
                    color="secondary"
                    className={classes.chip}
                  />
                ))}
              </TableCell>
              <TableCell>
                <Checkbox
                  size="small"
                  checked={user.active}
                  onChange={() => {}}
                  inputProps={{ 'aria-label': 'user active' }}
                />
              </TableCell>
              <TableCell>
                <Button
                  disabled // TODO:
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  Güncelle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
