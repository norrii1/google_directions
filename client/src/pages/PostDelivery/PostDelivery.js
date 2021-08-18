import { makeStyles, withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import NAVIGATOR from '../../components/NAVIGATOR'
import DeliveryForm from '../../components/DeliveryForm'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { useEffect, useState } from 'react'
import Listing from '../../utils/ListingAPI'
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

const PostDelivery = props => {
  const [listingState, setListingState] = useState({
    title: null,
    body: '',
    price: '',
    rent: false,
    sell: false,
    initialAddress: '',
    destination: '',
    listings: [],
    errors: {
      title: ''
    }
  })
  const handleInputChange = ({ target }) => {
    setListingState({ ...listingState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
    const { name, value } = event.target
    let errors = listingState.errors
    switch (name) {
      case 'title':
        errors.title =
          value.length < 5
            ? 'Must enter a Title'
            : '';
        break;
      default:
        break;
    }
    event.preventDefault()
    const date = new Date().setDate(new Date().getDate() - 10)
    Listing.create({
      title: listingState.title,
      recieve: listingState.recieve,
      send: listingState.send,
      initialAddress: listingState.initialAddress,
      destination: listingState.destination,
      datePosted: date,
      errors: {
        title: ''
      }
    })
      .then(({ data: listing }) => {
        const listings = [...listingState.listings]
        listings.push(listing)
        setListingState({ errors, [name]: value })
      })
  }
  useEffect(() => {
    Listing.getAll()
      .then(({ data: listings }) => {
        console.log(listings)
        setListingState({ ...listingState, listings })
      })
  }, [])

  return (
   <div>
     <NAVIGATOR />
     <main style={{marginLeft: '10%'}}>
       <DeliveryForm 
          title={listingState.title}
          recieve={listingState.recieve}
          send={listingState.send}
          initialAddress={listingState.initialAddress}
          destination={listingState.destination}
          datePosted={listingState.datePosted}
          handleInputChange={handleInputChange}
          handleCreatePost={handleCreatePost}
       />
     </main>

   </div>

  )
}

export default PostDelivery