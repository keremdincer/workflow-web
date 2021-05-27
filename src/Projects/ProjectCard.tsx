import React, { useRef, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core'
import { gql, useMutation, useQuery } from '@apollo/client'
import { GET_CORPORATIONS } from '../Corporations/CorporationsPage'
import { GET_PROJECTS } from './ProjectsPage'

const ASSIGN_CORPORATION_TO_PROJECT = gql`
  mutation assign($projectId: Int!, $corporationId: Int!) {
    assignCorporationToProject(
      projectId: $projectId
      corporationId: $corporationId
    )
  }
`

const DISMISS_CORPORATION_TO_PROJECT = gql`
  mutation dismiss($projectId: Int!, $corporationId: Int!) {
    dismissCorporationFromProject(
      projectId: $projectId
      corporationId: $corporationId
    )
  }
`

interface Props {
  id: number
  name: string
  corporations: {
    id: number
    name: string
  }[]
}

export const ProjectCard: React.FC<Props> = ({ id, name, corporations }) => {
  const { loading, data } = useQuery(GET_CORPORATIONS)
  const [openMenu, setOpenMenu] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const classes = useStyles()
  const [assignCorpToProject] = useMutation(ASSIGN_CORPORATION_TO_PROJECT)
  const [dismissCorpFromProject] = useMutation(DISMISS_CORPORATION_TO_PROJECT)

  const assign = async (corporationId: number) => {
    await assignCorpToProject({
      variables: {
        corporationId: Number(corporationId),
        projectId: Number(id),
      },
      refetchQueries: [{ query: GET_PROJECTS }],
    })
    setOpenMenu(false)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography className={classes.projectTitle}>{name}</Typography>

        {corporations.map((corp) => (
          <Chip
            className={classes.chip}
            key={corp.id}
            color="primary"
            variant="outlined"
            label={corp.name}
            onDelete={() =>
              dismissCorpFromProject({
                variables: {
                  corporationId: Number(corp.id),
                  projectId: Number(id),
                },
                refetchQueries: [{ query: GET_PROJECTS }],
              })
            }
          />
        ))}

        <span>
          <Chip
            color="secondary"
            variant="outlined"
            label="Ekle"
            aria-label="add"
            ref={anchorRef}
            onClick={() => setOpenMenu(true)}
          />
          <Popper
            open={openMenu}
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
                  <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                    <MenuList
                      autoFocusItem={openMenu}
                      id="menu-list-grow"
                      onKeyDown={() => setOpenMenu(false)}
                    >
                      {loading
                        ? null
                        : data.corporations.map((corp: any) => (
                            <MenuItem onClick={() => assign(corp.id)}>
                              {corp.name}
                            </MenuItem>
                          ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </span>
      </CardContent>

      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
  },
  projectTitle: {
    marginBottom: theme.spacing(1),
  },
}))
