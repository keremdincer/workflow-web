import { useQuery } from '@apollo/client'
import { CircularProgress, Container, makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import gql from 'graphql-tag'
import React from 'react'
import { Layout } from '../components/Layout'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'

export const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      corporations {
        id
        name
      }
    }
  }
`

export const ProjectsPage: React.FC = () => {
  const classes = useStyles()
  // TODO: Bunun gibi işlemler için bir helper component gerekiyor.
  // Loading sırasında CircularProgress çıkaracak. Hata olduğunda da kullanıcıya
  // geri bildirimde bulunacak şekilde.
  const { loading, data } = useQuery(GET_PROJECTS)

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
            {data.projects.map((project: any) => (
              <Grid key={project.id} item>
                <ProjectCard {...project} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <ProjectDialog />
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
