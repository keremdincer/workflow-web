import { useQuery } from '@apollo/client'
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core'
import gql from 'graphql-tag'
import React from 'react'
import { Layout } from '../components/Layout'
import { CorporationDialog } from './CorporationDialog'

export const GET_CORPORATIONS = gql`
  query {
    corporations {
      id
      name
    }
  }
`

export const CorporationsPage: React.FC = () => {
  const { loading, data } = useQuery(GET_CORPORATIONS)
  const classes = useStyles()

  return (
    <Layout>
      <Container maxWidth="xl">
        {loading ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.progress}
          >
            <CircularProgress color="primary" />
          </Grid>
        ) : (
          <Grid className={classes.grid} container spacing={2}>
            {data.corporations.map((corporation: any) => (
              <Grid key={corporation.id} item>
                <p>{corporation.name}</p>
                {/* <ProjectCard name={project.name} /> */}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <CorporationDialog />
    </Layout>
  )
}

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBlock: theme.spacing(2),
  },
  progress: {
    padding: theme.spacing(10),
  },
}))
