import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'
import { CardActionArea } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Rating from '@material-ui/lab/Rating'
import Card from '@material-ui/core/Card'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    maxWidth: 545,
  },
  media: {
    height: 300,
  },
});

export default function MediaCard(props) {
  const [value, setValue] = React.useState(props.rating);
  const classes = useStyles();
  let hasUpdated = false
  let datePosted = JSON.stringify(props.date)
  let selldate = JSON.stringify(props.datesold)
  if (props.isSold) {
    selldate = selldate.slice(1, 11)
  }

  const handleUpdateRating = (value, id) => {
    if (props.rating >= 0) { hasUpdated = true }
    axios.put(`/api/listings/${id}`, { rating: value }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: listing }) => {
        console.log(listing)
        axios.get(`/api/users/id/${listing.seller}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: user }) => {
            console.log(user)
            let newNumRatings = user.numratings
            let newRating = user.rating
            if (!hasUpdated && listing.rating < 0) {
              console.log('number incremented')
              newNumRatings = (newNumRatings + 1)
              newRating = (((newRating) * user.numratings) + value) / newNumRatings
            }
            else {
              newRating = ((((newRating)*newNumRatings)-listing.rating)+value)/newNumRatings
            }
            axios.put(`/api/users/${user.username}`, { rating: newRating, numratings: newNumRatings }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(rating => {
                console.log(newRating)
                console.log(rating)
                setValue(value)
              })
          })
      })
      .catch(err => console.log(err))
  }
  const deleteListing = id => {
    axios.delete(`/api/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        alert('Listing removed')
        window.location.reload()
      })
  }


  return (
    <Card 
         className={classes.root}
        style={{
          marginLeft: '20%',
          marginTop: '8%'
        }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://raw.githubusercontent.com/akexorcist/Android-GoogleDirectionLibrary/master/image/google-direction-library_01.jpg"
          title='Status'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Package Number 1
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Your Package will be delivered in 45 minutes
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}