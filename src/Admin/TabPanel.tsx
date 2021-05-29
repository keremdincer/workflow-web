import { Box } from '@material-ui/core'
import React from 'react'

interface Props {
  value: number
  index: number
}

export const TabPanel: React.FC<Props> = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}
