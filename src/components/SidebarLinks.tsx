import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AdminIcon from '@material-ui/icons/Settings'
import ProjectIcon from '@material-ui/icons/Work'
import BusinessIcon from '@material-ui/icons/Business'
// import { useAuth } from '../contexts/AuthContext'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { Link } from 'react-router-dom'

interface SidebarLink {
  key: string
  path: string
  label: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}

const links: SidebarLink[] = [
  { key: 'link-dashboard', path: '/', label: 'Anasayfa', icon: DashboardIcon },
  { key: 'link-admin', path: '/admin', label: 'Yönetim', icon: AdminIcon },
  {
    key: 'link-projects',
    path: '/projects',
    label: 'Projeler',
    icon: ProjectIcon,
  },
  {
    key: 'link-corporations',
    path: '/corporations',
    label: 'Firmalar',
    icon: BusinessIcon,
  },
]

export const SidebarLinks = () => {
  return (
    <div>
      {links.map((link) => (
        <ListItem key={link.key} button component={Link} to={link.path}>
          <ListItemIcon>{React.createElement(link.icon)}</ListItemIcon>
          <ListItemText primary={link.label} />
        </ListItem>
      ))}
    </div>
  )
}
