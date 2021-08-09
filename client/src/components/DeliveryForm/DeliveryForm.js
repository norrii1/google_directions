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

  const [rentState, setRentState] = useState(false)
  const handleCheckboxR = () => {
    setRentState(!rentState)
  }

  const [saleState, setSaleState] = useState(false)
  const handleCheckboxS = () => {
    setSaleState(!saleState)
  }


  const handleCreatePost = event => {
    event.preventDefault()
    if (props.title.length > 4 && props.price.length > 0 && category && props.body.length > 2) {
      const date = new Date().setDate(new Date().getDate())
      Listing.create({
        title: props.title,
        rent: rentState,
        sell: saleState,
        body: props.body,
        price: props.price,
        lat: lat,
        lng: lng,
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
    else {
      alert('All input fields are required. Please check your input and try again.')
    }
  }


  return ( 
    <div className={classes.root} autoComplete='off'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='title'>Title</InputLabel>
        <OutlinedInput
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
          <MenuItem value={process.env.REACT_APP_PET_ID}>Pets</MenuItem>
          <MenuItem value={process.env.REACT_APP_EL_ID}>Electronics</MenuItem>
          <MenuItem value={process.env.REACT_APP_HG_ID}>Home Goods</MenuItem>
          <MenuItem value={process.env.REACT_APP_VEHICLES_ID}>Vehicles</MenuItem>
          <MenuItem value={process.env.REACT_APP_CLOTHES_ID}>Clothes</MenuItem>

        </Select>
      </FormControl>

      <br />
      <p>
        <span style={{ marginTop: "13px" }}>Recieve Package</span>

        <Checkbox
          id='rent'
          value={props.rent}
          name='rent'
          onChange={handleCheckboxR}
          variant='outlined'
          color='primary' />
      </p>
      <p>
        <span style={{ marginTop: "13px" }}>Send Package</span>

        <Checkbox
          value={props.sell}
          name='sell'
          onChange={handleCheckboxS}
          variant='outlined'
          color='primary'
        />
      </p>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='body'>Description</InputLabel>
        <OutlinedInput
          id='body'
          labelWidth={50}
          multiline
          rows={4}
          name='body'
          value={props.body}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='price'>Price</InputLabel>
        <OutlinedInput
          labelWidth={10}
          name='price'
          value={props.price}
          onChange={props.handleInputChange}
          required='true'
        />
      </FormControl>
      <br />
      <FormControl>
        <Map />
      </FormControl>

      <Button onClick={handleCreatePost} variant='outlined' color='primary'>
        Create Listing
      </Button>
    </div>
  )

}

export default DeliveryForm 