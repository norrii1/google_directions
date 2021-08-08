import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent'
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
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
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import { useState } from 'react'
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
      { id: 'Authentication', icon: <PeopleIcon />, active: true },
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
];




const libraries = ["places"]
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
  const [selected, setSelected] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
  
  let lat = 0, lng = 0

  const mapContainerStyle = {
    height: "69vh",
    width: "100%",
  }
  const center = { lat: 37.8719, lmg: 22.2585 }
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
    if (mapRef.current.zoom < 14) {
      setProgress(0)
    }
  }, [])

  const [progress, setProgress] = React.useState()
  const classes = useStyles()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCzfVue49sMcwHHa1FXAYDiSrpE1CTJ6IE',
    libraries,
  })

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14)
    console.log(mapRef.current)
    if (mapRef.current.zoom === 14) {

      const timer = setInterval(() => {
        setProgress(100)
      }, 500)
      return () => {
        clearInterval(timer);
      };
    }
  }, [])


  if (loadError) return "Error"
  if (!isLoaded) return "Loading..."

  return (
    <div
      id='Compass'
      className="locate"
      onClick={() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            const diff = Math.random() * 15;
            return Math.min(oldProgress + diff, 100);
          });
        }, 700)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            lat = position.coords.latitude
            lng = position.coords.longitude
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
          },
          () => null
        );

      }
      }
    >
    <Drawer variant="permanent" >
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Beta
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Project Overview
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
    <div>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          onLoad={onMapLoad}
          onClick={onMapClick}
        />
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
    </div>
    </div>
  )
    }

export default NAVIGATOR

