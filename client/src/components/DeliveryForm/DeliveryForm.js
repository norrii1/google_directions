import { makeStyles, withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Listing from '../../utils/ListingAPI'
import Map from '../../components/Map'
import { useState } from 'react'
import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"



let lat = 0, lng = 0


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex',
      width: '80%',
      marginLeft: '10%'
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
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}))



const DeliveryForm = props => {
  const [category, setCategory] = useState('')
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  const [recieveState, setRecieveState] = useState(false)
  const handleCheckboxR = () => {
    setRecieveState(!recieveState)
  }

  const [sendState, setSendState] = useState(false)
  const handleCheckboxS = () => {
    setSendState(!sendState)
  }



  const handleCreatePost = event => {
    event.preventDefault()
      const date = new Date().setDate(new Date().getDate())
      Listing.create({
        title: props.title,
        recieve: recieveState,
        send: sendState,
        initialAddress: initialAddressState,
        destination: destinationState,
        datePosted: date,
        category: category
      })
        .then(({ data: listing }) => {
          console.log('done')
          console.log(listing)
          window.location = `/listing/${listing._id}`
        })
        .catch(err => console.error(err))
    }

  
    
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
    if (mapRef.current.zoom < 14) {
      setProgress(0)
    }
  }, [])

  const [progress, setProgress] = React.useState()

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
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

  const [initialAddressState, setInitialAddressState] = useState('')
  const handleIntialAddress = () => {
    setInitialAddressState(initialAddressState)
  }

  const [destinationState, setDestinationState] = useState('')
  const handleDestination = () => {
    setDestinationState(destinationState)
  }



  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    });
  
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
    };
    return (
      <div className="search" style={{ 
        lineHeight: '40px'
       }}
       >
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
            style={{
              lineHeight: '30px',
              width: '69vw'
            }}
          />
          <ComboboxPopover 
          style={{
            backgroundColor: 'white'
          }}
          >
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }


  return ( 
    <div className={classes.root} autoComplete='off'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='title'>Title</InputLabel>
        <OutlinedInput
          id= 'title'
          value={props.title}
          labelWidth={50}
          name='title'
          onChange={props.handleInputChange}
          required='true'
        />
      </FormControl>
      {/* category */}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          onChange={handleChange}
        >
          <MenuItem value={null}>
            <em>Select a Category</em>
          </MenuItem>
          <MenuItem value={process.env.REACT_APP_Food_ID}>Food</MenuItem>

        </Select>
      </FormControl>

      <br />
      <p>
        <span style={{ marginTop: "13px" }}>Recieve Package</span>

        <Checkbox
          id='rent'
          value={props.recieve}
          name='rent'
          onChange={handleCheckboxR}
          variant='outlined'
          color='primary' />
      </p>
      <p>
        <span style={{ marginTop: "13px" }}>Send Package</span>

        <Checkbox
          value={props.send}
          name='sell'
          onChange={handleCheckboxS}
          variant='outlined'
          color='primary'
        />
      </p>
      <FormControl>
      <Search 
        panTo={panTo}
          id= 'initialAddress'
          value={props.initialAddress}
          name= "initialAddress"
          onChange= {handleIntialAddress}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <Search 
          panTo={panTo}
          value={props.destination}
          name= 'destination'
          id= 'destination'
          onChange={handleDestination}
         />
      </FormControl>
      <br />


      <Button onClick={handleCreatePost} variant='outlined' color='primary'>
        Create Listing
      </Button>
    </div>
  )

}

export default DeliveryForm 