import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent'
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup'
import ModalComponent from '../LoginModal/modal.componenet'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import PeopleIcon from '@material-ui/icons/People'
import PublicIcon from '@material-ui/icons/Public'
import HomeIcon from '@material-ui/icons/Home'
import TimerIcon from '@material-ui/icons/Timer'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import { formatRelative } from "date-fns"
import { useState, useEffect } from 'react'
import List from '@material-ui/core/List'
import { Link }  from '@material-ui/core'
import User from '../../utils/UserAPI'
import PropTypes from 'prop-types'
import ListItems from '../ListItems'
import React from 'react'
import clsx from 'clsx'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'PostDelivery', icon: <PeopleIcon />, active: true,},
      { id: 'Database', icon: <DnsRoundedIcon /> },
      { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      { id: 'Hosting', icon: <PublicIcon /> },
      { id: 'Functions', icon: <SettingsEthernetIcon /> },
      { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  bar: {
    width: '100%',
  },
    categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  }
}))



function NAVIGATOR(props) {
  const classes = useStyles()
  const [meState, setMeState] = useState({
  me: { },
  isLoggedIn: true
})

const getMe = () => {
  User.me()
    .then(({ data: me }) => {
      if (me) {
        setMeState({ me, isLoggedIn: true })
      } else {
        getMe()
      }
    })
    .catch(err => {
      console.error(err)
      setMeState({ ...meState, isLoggedIn: false })
    })
}

const handleLogOut = () => {
  localStorage.removeItem('token')
  setMeState({ me: {}, isLoggedIn: false })
  window.location = '/'
}

useEffect(() => {
  getMe()
}, [])

const updateMe = () => {
  User.me()
    .then(({ data: me }) => {
      console.log(me)
      setMeState({ me, isLoggedIn: true })
    })
    .catch(err => {
      console.error(err)
      setMeState({ ...meState, isLoggedIn: false })
    })
}

  return (
    <Drawer variant="permanent" >
      <ListItem className={clsx(classes.itemCategory)} style={{ textDecoration: 'none', color: 'white' }}>
        Beta
      </ListItem>
      <ListItems style={{marginRight: '10%'}}/>
    </Drawer>
  )
    }

export default NAVIGATOR

