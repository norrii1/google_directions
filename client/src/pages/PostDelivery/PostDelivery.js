import { makeStyles, withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import NAVIGATOR from '../../components/NAVIGATOR'
import DeliveryForm from '../../components/DeliveryForm'
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

  return (
   <div>
     <NAVIGATOR />
     <main style={{marginLeft: '10%'}}>
       <DeliveryForm />
     </main>

   </div>

  )
}

export default PostDelivery